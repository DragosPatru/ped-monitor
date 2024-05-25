package com.simplypositive.pedmonitor.domain.service;

import static com.simplypositive.pedmonitor.domain.service.DataSourceFactors.ELECTRICITY_CODE;
import static com.simplypositive.pedmonitor.domain.service.DataSourceFactors.LOCALLY_PRODUCED_HEAT_COLD_CODE;

import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class FETSustainabilityCalculator {

  private final IndicatorService indicatorService;
  private final KPIs kpiRegistry;

  private final Comparator<KPI> kpiComparator =
      (k1, k2) -> {
        // Extract the numeric parts
        String numericPart1 = k1.getCode().replaceAll("\\D+", "");
        String numericPart2 = k2.getCode().replaceAll("\\D+", "");

        int numericComparison =
            Integer.compare(Integer.parseInt(numericPart1), Integer.parseInt(numericPart2));

        // If numeric parts are different, sort based on them
        if (numericComparison != 0) {
          return -numericComparison; // Descending order for numeric parts
        }

        String[] parts1 = k1.getCode().split("_");
        String[] parts2 = k2.getCode().split("_");

        // Primary comparison by the length of the parts array in descending order
        int lengthComparison = Integer.compare(parts2.length, parts1.length);
        if (lengthComparison != 0) {
          return lengthComparison;
        }

        // Secondary comparison by lexicographical order if lengths are equal
        return k1.getCode().compareTo(k2.getCode());
      };

  public FETSustainabilityCalculator(IndicatorService indicatorService, KPIs kpis) {
    this.indicatorService = indicatorService;
    this.kpiRegistry = kpis;
  }

  public Map<String, AnnualValue> compute(
      AnnualReport annualReport, List<IndicatorEntity> indicators) {
    Map<String, AnnualValue> fetKPIs = new HashMap<>();
    List<KPI> kpis =
        annualReport.getKpis().stream()
            .filter(kpi -> kpi.isFET())
            .sorted(kpiComparator)
            .collect(Collectors.toList());

    Map<String, List<IndicatorEntity>> fetIndicatorsByParent =
        indicators.stream()
            .filter(i -> i.isFET())
            .collect(Collectors.groupingBy(IndicatorEntity::getParentIndicatorCode));

    for (var indicatorParent : fetIndicatorsByParent.keySet()) {
      double total = 0.0;
      double greenHouseEmissions = 0.0;

      for (IndicatorEntity indicator : fetIndicatorsByParent.get(indicatorParent)) {
        Map.Entry<Double, Double> stats = totalAndGreenHouseEmissionStats(indicator, annualReport);
        total += stats.getKey();
        greenHouseEmissions += stats.getValue();
      }

      if (total > 0) {
        fetKPIs.put(indicatorParent, new AnnualValue(annualReport.getYear(), total));
        fetKPIs.put(
            findGreenHouseEmissionsKpi(indicatorParent, kpis).get().getCode(),
            new AnnualValue(annualReport.getYear(), greenHouseEmissions));
      }
    }

    for (KPI kpi : kpis) {
      if (!fetKPIs.containsKey(kpi.getCode())) {
        // not computed yet
        Set<String> children = kpiRegistry.childrenOf(kpi);
        if (!children.isEmpty()) {
          double value = 0.0;
          var oneChildWithData = false;
          for (var child : children) {
            AnnualValue annualValue = fetKPIs.get(child);
            if (annualValue != null) {
              value += annualValue.getValue();
              oneChildWithData = true;
            }
          }
          if (oneChildWithData) {
            fetKPIs.put(kpi.getCode(), new AnnualValue(annualReport.getYear(), value));
          }

        } else { // indicator but KPI
          Optional<IndicatorEntity> kpiIndicator =
              indicators.stream().filter(i -> i.getCode().equals(kpi.getCode())).findFirst();
          if (kpiIndicator.isPresent()) {
            Map.Entry<Double, Double> stats =
                totalAndGreenHouseEmissionStats(kpiIndicator.get(), annualReport);
            if (stats.getKey() > 0) {
              fetKPIs.put(kpi.getCode(), new AnnualValue(annualReport.getYear(), stats.getKey()));
              fetKPIs.put(
                  findGreenHouseEmissionsKpi(kpi.getCode(), kpis).get().getCode(),
                  new AnnualValue(annualReport.getYear(), stats.getValue()));
            }
          }
        }
      }
    }

    return fetKPIs;
  }

  private Map.Entry<Double, Double> totalAndGreenHouseEmissionStats(
      IndicatorEntity indicator, AnnualReport annualReport) {
    List<IndicatorValue> values =
        indicatorService.getData(indicator.getId(), annualReport.getYear());
    double total = 0.0;
    double greenHouseEmissions = 0.0;

    for (var value : values) {
      double factor = 0.0;
      if (ELECTRICITY_CODE.equalsIgnoreCase(value.getDataSourceCode())) {
        factor = annualReport.getEnergySourceFactors().getGhgEmissionFactorElectricity();

      } else if (LOCALLY_PRODUCED_HEAT_COLD_CODE.equalsIgnoreCase(value.getDataSourceCode())) {
        factor = annualReport.getEnergySourceFactors().getGhgEmissionFactorForHeathColdGenerated();

      } else {
        factor =
            annualReport
                .getFetSourceFactors()
                .factorBySourceCode(value.getDataSourceCode())
                .orElse(0.0);
      }

      total += value.getAmount();
      greenHouseEmissions += value.getAmount() * factor;
    }

    return Map.entry(total, greenHouseEmissions);
  }

  private Optional<KPI> findGreenHouseEmissionsKpi(String code, List<KPI> kpis) {
    return kpis.stream()
        .filter(kpi -> kpi.isGreenHouseEmissions() && kpi.baseCode().equals(code))
        .findFirst();
  }
}
