package com.simplypositive.pedmonitor.application;

import com.simplypositive.pedmonitor.domain.PedDefinition;
import com.simplypositive.pedmonitor.domain.PedOverview;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.service.PedService;
import com.simplypositive.pedmonitor.service.SustainabilityIndicatorService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PedDefinitionHandler {

  private final PedService pedService;
  private final SustainabilityIndicatorService indicatorService;

  @Autowired
  public PedDefinitionHandler(
      PedService pedService, SustainabilityIndicatorService indicatorService) {
    this.pedService = pedService;
    this.indicatorService = indicatorService;
  }

  public PedDefinition create(PedDefinition pedDefinition) {
    PositiveEnergyDistrict ped = pedService.create(pedDefinition.getPed());

    pedDefinition
        .getIndicators()
        .forEach(
            indicator -> {
              indicator.setPedId(ped.getId());
            });

    List<SustainabilityIndicator> indicators =
        indicatorService.createAll(pedDefinition.getIndicators());

    return new PedDefinition(ped, indicators);
  }

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
    return new PedOverview(ped, indicatorOverviews);
  }
}
