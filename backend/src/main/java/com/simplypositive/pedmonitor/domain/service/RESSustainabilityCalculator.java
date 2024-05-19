package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.domain.model.AnnualReport;
import com.simplypositive.pedmonitor.domain.model.AnnualValue;
import com.simplypositive.pedmonitor.domain.model.KPI;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class RESSustainabilityCalculator {

  private final IndicatorService indicatorService;
  private final KPIs kpiRegistry;

  public RESSustainabilityCalculator(IndicatorService indicatorService, KPIs kpiRegistry) {
    this.indicatorService = indicatorService;
    this.kpiRegistry = kpiRegistry;
  }

  public Map<String, AnnualValue> compute(
      AnnualReport annualReport, List<IndicatorEntity> indicators) {
    Map<String, AnnualValue> resKPIs = new HashMap<>();

    Map<String, List<IndicatorEntity>> indicatorsByParent =
        indicators.stream()
            .filter(i -> i.isRES())
            .collect(Collectors.groupingBy(IndicatorEntity::getParentIndicatorCode));

    for (var indicatorParent : indicatorsByParent.keySet()) {
      double total = 0.0;
      for (IndicatorEntity indicator : indicatorsByParent.get(indicatorParent)) {
        Double totalPerChild = totalStats(indicator, annualReport);
        total += totalPerChild;
      }
      if (total > 0) {
        resKPIs.put(indicatorParent, new AnnualValue(annualReport.getYear(), total));
      }
    }

    List<KPI> kpis =
        annualReport.getKpis().stream().filter(kpi -> kpi.isFET()).collect(Collectors.toList());
    for (KPI kpi : kpis) {
      if (!resKPIs.containsKey(kpi.getCode())) {
        // not computed yet
        Set<String> children = kpiRegistry.childrenOf(kpi);
        if (!children.isEmpty()) {
          double value = 0.0;
          var oneChildWithData = false;
          for (var child : children) {
            AnnualValue annualValue = resKPIs.get(child);
            if (annualValue != null) {
              value += annualValue.getValue();
              oneChildWithData = true;
            }
          }
          if (oneChildWithData) {
            resKPIs.put(kpi.getCode(), new AnnualValue(annualReport.getYear(), value));
          }
        }
      }
    }
    return resKPIs;
  }

  private Double totalStats(IndicatorEntity indicator, AnnualReport annualReport) {
    List<IndicatorValue> values =
        indicatorService.getData(indicator.getId(), annualReport.getYear());
    double total = 0.0;

    for (var value : values) {
      total += value.getAmount();
    }

    return total;
  }
}
