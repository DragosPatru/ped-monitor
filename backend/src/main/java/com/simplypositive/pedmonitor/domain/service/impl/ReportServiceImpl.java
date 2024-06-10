package com.simplypositive.pedmonitor.domain.service.impl;

import static com.simplypositive.pedmonitor.domain.service.KPIs.*;
import static com.simplypositive.pedmonitor.persistence.entity.ResourceStatus.DONE;
import static com.simplypositive.pedmonitor.utils.Numbers.withScale;
import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.simplypositive.pedmonitor.domain.exception.DataProcessingException;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.domain.service.*;
import com.simplypositive.pedmonitor.persistence.entity.AnnualReportEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import com.simplypositive.pedmonitor.persistence.repository.AnnualReportRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ReportServiceImpl implements ReportService {
  private final AnnualReportRepository annualReportRepo;
  private final DataSourceFactors dataSourceFactors;
  private final KPIs kips;
  private final IndicatorService indicatorService;
  private final FETSustainabilityCalculator fetCalculator;
  private final RESSustainabilityCalculator resCalculator;
  private final ObjectMapper objectMapper;

  @Autowired
  public ReportServiceImpl(
      AnnualReportRepository annualReportRepo,
      ObjectMapper objectMapper,
      DataSourceFactors dataSourceFactors,
      KPIs kips,
      IndicatorService indicatorService,
      FETSustainabilityCalculator fetCalculator,
      RESSustainabilityCalculator resCalculator) {
    this.annualReportRepo = annualReportRepo;
    this.objectMapper = objectMapper;
    this.dataSourceFactors = dataSourceFactors;
    this.kips = kips;
    this.indicatorService = indicatorService;
    this.fetCalculator = fetCalculator;
    this.resCalculator = resCalculator;
  }

  @Override
  public List<AnnualReport> defineReportsForPed(PedEntity ped, AnnualReportSpec spec) {
    List<AnnualReport> annualReports = annualReportsSpecs(ped, spec);
    annualReports.forEach(
        report -> {
          try {
            AnnualReportEntity reportEntity = new AnnualReportEntity();
            reportEntity.setPedId(ped.getId());
            reportEntity.setAssignedYear(report.getYear());
            reportEntity.setKpisJson(objectMapper.writeValueAsString(report.getKpis()));
            reportEntity.setEnergySourceFactorsJson(
                objectMapper.writeValueAsString(report.getEnergySourceFactors()));
            reportEntity.setFetSourceFactorsJson(
                objectMapper.writeValueAsString(report.getFetSourceFactors()));
            if (report.getResSources() != null) {
              reportEntity.setResSourcesJson(
                  objectMapper.writeValueAsString(report.getResSources()));
            }
            reportEntity = annualReportRepo.save(reportEntity);
            report.setId(reportEntity.getId());

          } catch (JsonProcessingException e) {
            throw new DataProcessingException("Failed to process PED reporting details", e);
          }
        });
    return annualReports;
  }

  @Override
  public void updateEnergySourceFactors(
      PedEntity ped, Integer year, EnergySourceFactors sourceFactors)
      throws ResourceNotFoundException {
    if (!(ped.getBaselineYear() <= year && year <= ped.getTargetYear())) {
      throw new IllegalArgumentException("year - is not within the PED range");
    }
    List<AnnualReportEntity> reportEntities =
        annualReportRepo.findAllByPedIdAndAssignedYear(ped.getId(), year);
    if (reportEntities == null || reportEntities.isEmpty()) {
      throw new ResourceNotFoundException("Annual report not found for year " + year);
    }

    try {
      AnnualReportEntity entity = reportEntities.get(0);
      entity.setEnergySourceFactorsJson(objectMapper.writeValueAsString(sourceFactors));
      annualReportRepo.save(entity);

    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public Optional<AnnualReport> lastYearReport(PedEntity ped) {
    int lastYear = Integer.min(LocalDate.now().getYear(), ped.getTargetYear());
    return firstReport(ped.getId(), lastYear);
  }

  @Override
  public List<String> getFetDataSourceCodes(PedEntity ped, Integer year) {
    int lastYear = Integer.min(year, ped.getTargetYear());
    List<String> result = new ArrayList<>();
    Optional<AnnualReport> report = firstReport(ped.getId(), lastYear);
    if (report.isPresent()) {
      var sourceFactors = report.get().getFetSourceFactors();
      result.addAll(sourceFactors.getDataSources());
      result = result.stream().sorted().toList();
    }
    return result;
  }

  @Override
  public List<String> getResDataSourceCodes(PedEntity ped, Integer year) {
    int lastYear = Integer.min(year, ped.getTargetYear());
    List<String> result = new ArrayList<>();
    Optional<AnnualReport> report = firstReport(ped.getId(), lastYear);
    if (report.isPresent()) {
      var sourceFactors = report.get().getResSources();
      result.addAll(sourceFactors);
      result = result.stream().sorted().toList();
    }
    return result;
  }

  @Override
  public List<EnergySourceFactors> getEnergySourceFactors(Integer pedId) {
    return annualReportRepo.findAllByPedId(pedId).stream()
        .map(
            e -> {
              EnergySourceFactors energySourceFactors = fromEntity(e).getEnergySourceFactors();
              energySourceFactors.setReportingYear(e.getAssignedYear());
              return energySourceFactors;
            })
        .collect(Collectors.toList());
  }

  @Override
  public PedStats getKpis(PedEntity ped) {
    Map<String, List<AnnualValue>> kpisByYear = new HashMap<>();
    List<IndicatorEntity> indicators = indicatorService.getPedIndicators(ped.getId());
    int maxYear = Integer.max(LocalDate.now().getYear(), ped.getTargetYear());
    for (Integer year = ped.getBaselineYear(); year <= maxYear; year++) {
      firstReport(ped.getId(), year)
          .ifPresent(
              report -> {
                if (report.isCompleted()) {
                  addKpis(report, kpisByYear);

                } else {
                  computeKpis(report, indicators, kpisByYear);
                }
              });
    }

    PedStats stats = PedStats.builder().kpisByYear(kpisByYear).build();
    computeOverallStats(ped, stats);

    return stats;
  }

  @Override
  public Map<String, List<AnnualValue>> calculateKpis(List<IndicatorEntity> indicators) {
    return null;
  }

  @Override
  @Transactional
  public void deleteAllForPed(Integer pedId) {
    annualReportRepo.deleteAllByPedId(pedId);
  }

  private void addKpis(AnnualReport annualReport, Map<String, List<AnnualValue>> result) {
    annualReport
        .getKpis()
        .forEach(
            kpi -> {
              List<AnnualValue> values = result.getOrDefault(kpi.getCode(), new ArrayList<>());
              AnnualValue value = new AnnualValue(annualReport.getYear(), kpi.getValue());
              values.add(value);
              result.put(kpi.getCode(), values);
            });
  }

  private void computeKpis(
      AnnualReport annualReport,
      List<IndicatorEntity> indicators,
      Map<String, List<AnnualValue>> result) {

    Map<String, AnnualValue> fetValues = computeFET(annualReport, indicators);
    Map<String, AnnualValue> resValues = computeRES(annualReport, indicators);
    Map<String, AnnualValue> selfEnergySupply =
        selfEnergySupplyRate(annualReport, fetValues, resValues);
    Map<String, AnnualValue> petValues = computePET(annualReport, fetValues);

    if (selfEnergySupply != null) {
      mergeResults(selfEnergySupply, result);
    }
    mergeResults(fetValues, result);
    mergeResults(resValues, result);
    mergeResults(petValues, result);
  }

  private Map<String, AnnualValue> computeFET(
      AnnualReport annualReport, List<IndicatorEntity> indicators) {
    return fetCalculator.compute(annualReport, indicators);
  }

  private Map<String, AnnualValue> computeRES(
      AnnualReport annualReport, List<IndicatorEntity> indicators) {
    return resCalculator.compute(annualReport, indicators);
  }

  private Map<String, AnnualValue> computePET(
      AnnualReport annualReport, Map<String, AnnualValue> fetValues) {
    Integer year = annualReport.getYear();
    Map<String, AnnualValue> petStats = new HashMap<>();
    for (int i = 0; i <= 3; i++) {
      String fetKpiCode = "FET" + i;
      String petKpiCode = "PET" + i;
      Optional<KPI> pet0 = annualReport.kpiByCode(fetKpiCode);
      if (pet0.isPresent()) {
        AnnualValue fetValue = fetValues.get(fetKpiCode);
        if (fetValue != null) {
          petStats.put(
              petKpiCode,
              new AnnualValue(
                  year,
                  fetValue.getValue()
                      * annualReport.getEnergySourceFactors().getPrimaryEnergyFactor()));
        }
      }
    }
    return petStats;
  }

  private void computeOverallStats(PedEntity ped, PedStats stats) {
    var overallRes = stats.kpiByCode(SS).isPresent();
    var overallGhg = stats.kpiByCode(GHG).isPresent();

    if (overallRes) {
      List<AnnualValue> ssValues = stats.kpiByCode(SS).get();
      AnnualValue maxValue = Collections.max(ssValues, Comparator.comparing(AnnualValue::getValue));
      var result = Math.min(maxValue.getValue(), 100);
      stats.setOverallRes(withScale(result, 1));
    }

    //    if (overallRes) {
    //      List<AnnualValue> ssValues = stats.kpiByCode(SS).get();
    //      AnnualValue maxValue = Collections.max(ssValues,
    // Comparator.comparing(AnnualValue::getValue));
    //      var result = Math.min(maxValue.getValue(), 100);
    //      if (result < 100) {
    //       // calculate progress against self supply in baseline
    //        AnnualValue fet0Value = stats.kpiByCode("FET0").get().stream().filter(v ->
    // maxValue.getYear().equals(v.getYear())).findFirst().get();
    //        AnnualValue res0Value = stats.kpiByCode("RES0").get().stream().filter(v ->
    // maxValue.getYear().equals(v.getYear())).findFirst().get();
    //
    //        double selfSupplyBaseline = ped.getPercentSelfSupplyRenewableEnergyInBaseline() *
    // fet0Value.getValue() / 100;
    //        result = (res0Value.getValue() - selfSupplyBaseline) / (fet0Value.getValue() -
    // selfSupplyBaseline) * 100;
    //      }
    //      stats.setOverallRes(withScale(result, 1));
    //    }

    if (overallGhg) {
      List<AnnualValue> values = stats.kpiByCode(GHG).get();
      AnnualValue minValue = Collections.min(values, Comparator.comparing(AnnualValue::getValue));
      var result = Math.max(minValue.getValue(), 0);
      if (result > 0) {
        // TODO: CALCULATE GHG for baseline year
        //result = (1 - result / ped.getGhgEmissionsTotalInBaseline()) * 100;

      } else {
        result = 100;
      }

      stats.setOverallGhg(withScale(result, 1));
    }

    if (stats.getOverallRes() != null && stats.getOverallGhg() != null) {
      stats.setOverallResGhg(
          withScale(
              (stats.getOverallRes().doubleValue() + stats.getOverallGhg().doubleValue()) / 2, 2));
    }
  }

  private Map<String, AnnualValue> selfEnergySupplyRate(
      AnnualReport annualReport,
      Map<String, AnnualValue> fetValues,
      Map<String, AnnualValue> resValues) {
    Map<String, AnnualValue> overallKPIs = new HashMap<>();
    var overallSs = annualReport.kpiByCode(SS).isPresent();
    if (overallSs) {
      AnnualValue resValue = resValues.get("RES0");
      AnnualValue fetValue = fetValues.get("FET0");
      if (resValue != null && fetValue != null) {
        var value = resValue.getValue() / fetValue.getValue() * 100;
        overallKPIs.put(SS, new AnnualValue(annualReport.getYear(), value));
        return overallKPIs;
      }
    }

    return null;
  }

  private void mergeResults(
      Map<String, AnnualValue> partialResult, Map<String, List<AnnualValue>> result) {
    for (var key : partialResult.keySet()) {
      List<AnnualValue> values = result.getOrDefault(key, new ArrayList<>());
      values.add(partialResult.get(key));
      result.put(key, values);
    }
  }

  private List<AnnualReport> annualReportsSpecs(PedEntity ped, AnnualReportSpec request) {
    EnergySourceFactors energySourceFactors = request.getEnergySourceFactors();
    List<KPI> kpis = determineKpis(request.getIndicators());
    FetSourceFactors fetSourceFactors =
        FetSourceFactors.of(fetDataSourceFactors(request.getFetDataSources()));

    List<AnnualReport> reports = new ArrayList<>();
    for (int year = ped.getBaselineYear(); year <= ped.getTargetYear(); year++) {
      reports.add(
          AnnualReport.builder()
              .year(year)
              .kpis(kpis)
              .fetSourceFactors(fetSourceFactors)
              .energySourceFactors(energySourceFactors)
              .resSources(request.getResDataSources())
              .build());
    }

    return reports;
  }

  private List<KPI> determineKpis(Set<String> indicators) {
    Set<String> values = new HashSet();
    for (String indicator : indicators) {
      values.addAll(kips.kpiCodesForIndicator(indicator));
      values.addAll(kips.overallKPIs(values));
    }

    return values.stream().map(v -> new KPI(0.0, v)).toList();
  }

  private Map<String, Double> fetDataSourceFactors(Set<String> fetDataSources) {
    Map<String, Double> values = new HashMap<>();
    for (String ds : fetDataSources) {
      Double factor =
          dataSourceFactors
              .getLastFactorForSource(ds)
              .orElseThrow(() -> new DataProcessingException(ds + " - unknown data source code"));
      values.put(ds, factor);
    }
    return values;
  }

  private Optional<AnnualReport> firstReport(Integer pedId, Integer year) {
    List<AnnualReportEntity> reportEntities =
        annualReportRepo.findAllByPedIdAndAssignedYear(pedId, year);
    if (reportEntities != null && reportEntities.size() >= 1) {
      return ofNullable(fromEntity(reportEntities.get(0)));
    }
    return empty();
  }

  private AnnualReport fromEntity(AnnualReportEntity entity) {
    try {
      var fetSourceFactors =
          objectMapper.readValue(entity.fetSourceFactorsJson(), FetSourceFactors.class);
      var energySourceFactors =
          objectMapper.readValue(entity.energySourceFactorsJson(), EnergySourceFactors.class);
      var kpis = objectMapper.readValue(entity.kpisJson(), new TypeReference<List<KPI>>() {});
      Set<String> resSources = null;
      if (entity.resSourcesJson() != null) {
        resSources =
            objectMapper.readValue(entity.resSourcesJson(), new TypeReference<Set<String>>() {});
      }

      AnnualReport report =
          AnnualReport.builder()
              .id(entity.getId())
              .pedId(entity.getPedId())
              .year(entity.getAssignedYear())
              .fetSourceFactors(fetSourceFactors)
              .energySourceFactors(energySourceFactors)
              .resSources(resSources)
              .isCompleted(DONE == entity.getStatus())
              .kpis(kpis)
              .build();
      return report;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}
