package com.simplypositive.pedmonitor.application;

import com.simplypositive.pedmonitor.api.model.PedDefinitionRequest;
import com.simplypositive.pedmonitor.domain.exception.DataProcessingException;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.domain.service.DataSourceFactors;
import com.simplypositive.pedmonitor.domain.service.KPIs;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.domain.service.SustainabilityIndicatorService;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import jakarta.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PedDefinitionHandler {

  private final PedService pedService;
  private final SustainabilityIndicatorService indicatorService;

  private final DataSourceFactors dataSourceFactors;

  private final KPIs kips;

  @Autowired
  public PedDefinitionHandler(
      PedService pedService,
      SustainabilityIndicatorService indicatorService,
      DataSourceFactors dataSourceFactors,
      KPIs kips) {
    this.pedService = pedService;
    this.indicatorService = indicatorService;
    this.dataSourceFactors = dataSourceFactors;
    this.kips = kips;
  }

  @Transactional
  public PedDefinition createPedDefinition(PedDefinitionRequest request) {
    PositiveEnergyDistrict ped = request.pedData();
    pedService.create(new PedDefinition(ped, annualReportsSpec(request)));
    indicatorService.defineAll(request.getIndicators(), ped.getId());
    return PedDefinition.ofPed(ped);
  }

  private List<AnnualReport> annualReportsSpec(PedDefinitionRequest request) {
    EnergySourceFactors energySourceFactors = request.energySourceFactors();
    List<KPI> kpis = determineKpis(request.getIndicators());
    FetDataSources fetDataSources =
        FetDataSources.ofSouceFactors(fetDataSourceFactors(request.getFetDataSources()));

    List<AnnualReport> reports = new ArrayList<>();
    for (int year = request.getBaselineYear(); year <= request.getTargetYear(); year++) {
      reports.add(
          AnnualReport.builder()
              .year(year)
              .kpis(kpis)
              .fetDataSources(fetDataSources)
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

  //  public PedDefinition create(PedDefinition pedDefinition) {
  //    PositiveEnergyDistrict ped = pedService.create(pedDefinition.getPed());
  //
  //    pedDefinition
  //        .getIndicators()
  //        .forEach(
  //            indicator -> {
  //              indicator.setPedId(ped.getId());
  //            });
  //
  //    List<SustainabilityIndicator> indicators =
  //        indicatorService.createAll(pedDefinition.getIndicators());
  //
  //    return new PedDefinition(ped, indicators);
  //  }

  public PedOverview getOverview(Integer pedId) throws ResourceNotFoundException {
    PositiveEnergyDistrict ped =
        pedService.getById(pedId).orElseThrow(() -> new ResourceNotFoundException("PED", pedId));
    List<SustainabilityIndicator> indicators = indicatorService.getPedIndicators(pedId);
    List<SustainabilityIndicatorOverview> indicatorOverviews =
        indicators.stream()
            .map(
                indicator -> {
                  try {
                    return indicatorService.getProgress(indicator.getId());

                  } catch (ResourceNotFoundException e) {
                    throw new RuntimeException(e);
                  }
                })
            .collect(Collectors.toList());
    // TODO
    return new PedOverview(ped, null, indicatorOverviews);
  }
}
