package com.simplypositive.pedmonitor.domain.service.impl;

import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.simplypositive.pedmonitor.domain.exception.DataProcessingException;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.domain.service.DataSourceFactors;
import com.simplypositive.pedmonitor.domain.service.KPIs;
import com.simplypositive.pedmonitor.domain.service.ReportService;
import com.simplypositive.pedmonitor.persistence.entity.AnnualReportEntity;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import com.simplypositive.pedmonitor.persistence.repository.AnnualReportRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportServiceImpl implements ReportService {
  private final AnnualReportRepository annualReportRepo;
  private final ObjectMapper objectMapper;
  private final DataSourceFactors dataSourceFactors;
  private final KPIs kips;

  @Autowired
  public ReportServiceImpl(
      AnnualReportRepository annualReportRepo,
      ObjectMapper objectMapper,
      DataSourceFactors dataSourceFactors,
      KPIs kips) {
    this.annualReportRepo = annualReportRepo;
    this.objectMapper = objectMapper;
    this.dataSourceFactors = dataSourceFactors;
    this.kips = kips;
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
  @Transactional
  public Optional<AnnualReport> currentYearReport(PedEntity ped) {
    int currentYear = LocalDate.now().getYear();
    if (ped.getBaselineYear() <= currentYear && currentYear <= ped.getTargetYear()) {
      List<AnnualReportEntity> reportEntities =
          annualReportRepo.findAllByPedIdAndAssignedYear(ped.getId(), currentYear);
      if (reportEntities != null && reportEntities.size() >= 1) {
        return ofNullable(fromEntity(reportEntities.get(0)));
      }
    }

    return empty();
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

  private AnnualReport fromEntity(AnnualReportEntity entity) {
    try {
      AnnualReport report =
          AnnualReport.builder()
              .id(entity.getId())
              .year(entity.getAssignedYear())
              .fetSourceFactors(
                  objectMapper.readValue(entity.fetSourceFactorsJson(), FetSourceFactors.class))
              .energySourceFactors(
                  objectMapper.readValue(
                      entity.energySourceFactorsJson(), EnergySourceFactors.class))
              .kpis(objectMapper.readValue(entity.kpisJson(), new TypeReference<List<KPI>>() {}))
              .build();
      return report;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}