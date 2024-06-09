package com.simplypositive.pedmonitor.application;

import static java.util.Collections.emptyList;

import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.domain.service.ReportService;
import com.simplypositive.pedmonitor.persistence.entity.*;
import java.util.List;
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

    List<String> dataSourceCodes = emptyList();
    // TODO: return by year
    if (indicator.isRES()) {
      dataSourceCodes = reportService.getResDataSourceCodes(ped, ped.getTargetYear());
    } else {
      dataSourceCodes = reportService.getFetDataSourceCodes(ped, ped.getTargetYear());
    }

    builder
        .minTargetYear(ped.getBaselineYear())
        .maxTargetYear(ped.getTargetYear())
        .dataSourceCodes(dataSourceCodes)
        .indicator(indicator);
    return builder.build();
  }

  public IndicatorTask updateTask(IndicatorTask task) throws ResourceNotFoundException {
    if (task.getId() == null) {
      throw new ResourceNotFoundException("Task");
    }
    return indicatorService.updateTask(task);
  }
}
