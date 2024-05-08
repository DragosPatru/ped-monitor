package com.simplypositive.pedmonitor.application;

import com.simplypositive.pedmonitor.api.model.PedDefinitionRequest;
import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.domain.service.*;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import jakarta.transaction.Transactional;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PedDefinitionHandler {

  private final PedService pedService;
  private final IndicatorService indicatorService;

  private final ReportService reportService;

  @Autowired
  public PedDefinitionHandler(
      PedService pedService, IndicatorService indicatorService, ReportService reportService) {
    this.pedService = pedService;
    this.indicatorService = indicatorService;
    this.reportService = reportService;
  }

  @Transactional
  public PedDefinition createPedDefinition(PedDefinitionRequest request) {
    PedEntity ped = request.pedData();
    ped = pedService.create(ped);
    List<AnnualReport> reports =
        reportService.defineReportsForPed(
            ped,
            AnnualReportSpec.builder()
                .fetDataSources(request.getFetDataSources())
                .energySourceFactors(request.energySourceFactors())
                .indicators(request.getIndicators())
                .build());
    indicatorService.defineAll(request.getIndicators(), ped.getId());
    return PedDefinition.ofPed(ped, reports);
  }

  @Transactional
  public PedEntity updatePedDefinition(Integer pedId, PedUpdateRequest request)
      throws ResourceNotFoundException {
    PedEntity ped = pedService.updateFields(pedId, request.getName(), request.getDescription());
    reportService.updateEnergySourceFactors(
        ped, request.getReferenceYear(), request.energySourceFactors());
    return ped;
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
    PedEntity ped =
        pedService.getById(pedId).orElseThrow(() -> new ResourceNotFoundException("PED", pedId));

    double densityOfFocusDistrict = ped.getFocusDistrictPopulation() / ped.getFocusDistrictSize();
    double builtUpDensity = ped.getBuildUpAreaSize() / ped.getFocusDistrictSize();

    Map<String, IndicatorOverview> indicatorsOverview = new HashMap<>();
    indicatorService
        .getPedIndicatorsOverview(pedId)
        .forEach(
            i -> {
              indicatorsOverview.put(i.getIndicator().getCode(), i);
            });
    //    List<SustainabilityIndicatorOverview> indicatorOverviews =
    //        indicators.stream()
    //            .map(
    //                indicator -> {
    //                  try {
    //                    return indicatorService.getProgress(indicator.getId());
    //
    //                  } catch (ResourceNotFoundException e) {
    //                    throw new RuntimeException(e);
    //                  }
    //                })
    //            .collect(Collectors.toList());
    // TODO
    AnnualReport annualReport = reportService.lastYearReport(ped).orElse(null);
    reportService.getKpis(ped);
    return PedOverview.builder()
        .builtUpDensity(builtUpDensity)
        .densityOfFocusDistrict(densityOfFocusDistrict)
        .ped(ped)
        .lastYearReport(annualReport)
        .indicatorsOverview(indicatorsOverview)
        .build();
  }
}
