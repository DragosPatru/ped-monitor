package com.simplypositive.pedmonitor.application;

import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.application.model.IndicatorUpdateRequest;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.domain.service.ReportService;
import com.simplypositive.pedmonitor.persistence.entity.*;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IndicatorHandler {

  private final IndicatorService indicatorService;
  private final PedService pedService;

  private final ReportService reportService;

  @Autowired
  public IndicatorHandler(
      IndicatorService indicatorService, PedService pedService, ReportService reportService) {
    this.indicatorService = indicatorService;
    this.pedService = pedService;
    this.reportService = reportService;
  }

  public IndicatorOverview getOverview(Integer indicatorId) throws ResourceNotFoundException {
    var builder = IndicatorOverview.builder();
    IndicatorEntity indicator = indicatorService.getById(indicatorId);
    PedEntity ped = pedService.getById(indicator.getPedId());

    builder
        .minTargetYear(ped.getBaselineYear())
        .maxTargetYear(ped.getTargetYear())
        .dataSourceCodes(reportService.getDataSourceCodes(ped, LocalDate.now().getYear()))
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
