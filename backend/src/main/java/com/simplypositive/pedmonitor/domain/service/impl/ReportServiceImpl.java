package com.simplypositive.pedmonitor.domain.service.impl;

import static com.simplypositive.pedmonitor.persistence.entity.ResourceStatus.DONE;
import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.simplypositive.pedmonitor.domain.exception.DataProcessingException;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.domain.service.DataSourceFactors;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.domain.service.KPIs;
import com.simplypositive.pedmonitor.domain.service.ReportService;
import com.simplypositive.pedmonitor.persistence.entity.AnnualReportEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import com.simplypositive.pedmonitor.persistence.repository.AnnualReportRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.random.RandomGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {
  private final AnnualReportRepository annualReportRepo;
  private final DataSourceFactors dataSourceFactors;
  private final KPIs kips;
  private final IndicatorService indicatorService;
  private final ObjectMapper objectMapper;

  @Autowired
  public ReportServiceImpl(
      AnnualReportRepository annualReportRepo,
      ObjectMapper objectMapper,
      DataSourceFactors dataSourceFactors,
      KPIs kips,
      IndicatorService indicatorService) {
    this.annualReportRepo = annualReportRepo;
    this.objectMapper = objectMapper;
    this.dataSourceFactors = dataSourceFactors;
    this.kips = kips;
    this.indicatorService = indicatorService;
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
  public List<String> getDataSourceCodes(PedEntity ped, Integer year) {
    int lastYear = Integer.min(year, ped.getTargetYear());
    List<String> result = new ArrayList<>();
    Optional<AnnualReport> report = firstReport(ped.getId(), lastYear);
    if (report.isPresent()) {
      var sourceFactors = report.get().getFetSourceFactors();
      var energySourceFactors = report.get().getEnergySourceFactors();
      result.addAll(sourceFactors.getDataSources());
      result.add(energySourceFactors.getGhgEmissionFactorElectricitySourceCode());
      result.add(energySourceFactors.getGhgEmissionFactorForHeathColdGeneratedSourceCode());
      result = result.stream().sorted().toList();
    }
    return result;
  }

  @Override
  public Map<String, List<AnnualValue>> getKpis(PedEntity ped) {
    Map<String, List<AnnualValue>> kpisByYear = new HashMap<>();
    List<IndicatorEntity> indicators = new ArrayList<>();

    int maxYear = Integer.max(LocalDate.now().getYear(), ped.getTargetYear());
    for (Integer year = ped.getBaselineYear(); year <= maxYear; year++) {
      firstReport(ped.getId(), year)
          .ifPresent(
              report -> {
                addKpisMock(report, kpisByYear);
                //        if (report.isCompleted()) {
                //          addKpis(report, kpisByYear);
                //
                //        } else {
                //          if (indicators.isEmpty()) {
                //
                // indicators.addAll(indicatorService.getPedIndicators(report.getPedId()));
                //          }
                //          computeKpis(report, indicators, kpisByYear);
                //        }
              });
    }
    return kpisByYear;
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

  private void addKpisMock(AnnualReport annualReport, Map<String, List<AnnualValue>> result) {
    annualReport
        .getKpis()
        .forEach(
            kpi -> {
              List<AnnualValue> values = result.getOrDefault(kpi.getCode(), new ArrayList<>());
              AnnualValue value =
                  new AnnualValue(
                      annualReport.getYear(), RandomGenerator.getDefault().nextDouble(10, 100));
              values.add(value);
              result.put(kpi.getCode(), values);
            });
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

  // TODO
  private void computeKpis(
      AnnualReport annualReport,
      List<IndicatorEntity> indicators,
      Map<String, List<AnnualValue>> result) {
    List<KPI> kpis = annualReport.getKpis();
  }

  private AnnualValue computeValue(Integer pedId, KPI kpi, Integer year) { // TODO : dummy for now
    return new AnnualValue(year, RandomGenerator.getDefault().nextDouble(10, 100));
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
              .build());
    }

    return reports;
  }

  private List<KPI> determineKpis(Set<String> indicators) {
    Set<String> values = new HashSet();
    for (String indicator : indicators) {
      values.addAll(this.kips.kpisForIndicator(indicator));
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
      AnnualReport report =
          AnnualReport.builder()
              .id(entity.getId())
              .pedId(entity.getPedId())
              .year(entity.getAssignedYear())
              .fetSourceFactors(fetSourceFactors)
              .energySourceFactors(energySourceFactors)
              .isCompleted(DONE == entity.getStatus())
              .kpis(kpis)
              .build();
      return report;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}
