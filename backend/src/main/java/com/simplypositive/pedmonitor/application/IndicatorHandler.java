package com.simplypositive.pedmonitor.application;

import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.application.model.IndicatorUpdateRequest;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.persistence.entity.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IndicatorHandler {

  private final IndicatorService indicatorService;
  private final PedService pedService;

  @Autowired
  public IndicatorHandler(IndicatorService indicatorService, PedService pedService) {
    this.indicatorService = indicatorService;
    this.pedService = pedService;
  }

  public IndicatorOverview getOverview(Integer indicatorId) throws ResourceNotFoundException {
    var builder = IndicatorOverview.builder();
    IndicatorEntity indicator = indicatorService.getById(indicatorId);
    PedEntity ped = pedService.getById(indicator.getPedId());

    if (indicator.getDefinitionStatus() != ResourceStatus.INITIAL) {
      List<IndicatorTask> tasks = indicatorService.getTasks(indicatorId);
      List<IndicatorValue> values = indicatorService.getData(indicatorId);
      builder.tasks(tasks).values(values);
    }

    builder
        .minTargetYear(ped.getBaselineYear())
        .maxTargetYear(ped.getTargetYear())
        .indicator(indicator);
    return builder.build();
  }

  public IndicatorEntity update(Integer indicatorId, IndicatorUpdateRequest updateRequest)
      throws ResourceNotFoundException {
    return indicatorService.configure(
        indicatorId, updateRequest.getTargetValue(), updateRequest.getTargetYear());
  }

  public IndicatorTask updateTask(IndicatorTask task) throws ResourceNotFoundException {
    if (task.getId() == null) {
      throw new ResourceNotFoundException("Task");
    }
    return indicatorService.updateTask(task);
  }
}
