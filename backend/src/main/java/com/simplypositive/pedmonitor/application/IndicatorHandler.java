package com.simplypositive.pedmonitor.application;

import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.application.model.IndicatorUpdateRequest;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import com.simplypositive.pedmonitor.persistence.entity.ResourceStatus;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IndicatorHandler {

  private final IndicatorService indicatorService;

  @Autowired
  public IndicatorHandler(IndicatorService indicatorService) {
    this.indicatorService = indicatorService;
  }

  public IndicatorOverview getOverview(int indicatorId) throws ResourceNotFoundException {
    var builder = IndicatorOverview.builder();
    IndicatorEntity indicator = indicatorService.getById(indicatorId);
    if (indicator.getDefinitionStatus() != ResourceStatus.INITIAL) {
      List<IndicatorTask> tasks = indicatorService.getTasks(indicatorId);
      List<IndicatorValue> values = indicatorService.getData(indicatorId);
      builder.tasks(tasks).values(values);
    }

    builder.indicator(indicator);
    return builder.build();
  }

  public IndicatorEntity update(int indicatorId, IndicatorUpdateRequest updateRequest)
      throws ResourceNotFoundException {
    return indicatorService.configure(
        indicatorId, updateRequest.getTargetValue(), updateRequest.getTargetYear());
  }
}
