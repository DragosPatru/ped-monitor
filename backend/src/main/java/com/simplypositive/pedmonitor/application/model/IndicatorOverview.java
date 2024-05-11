package com.simplypositive.pedmonitor.application.model;

import com.simplypositive.pedmonitor.domain.model.IndicatorStats;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.List;
import lombok.*;

@Getter
@Setter
public class IndicatorOverview extends IndicatorStats {

  private List<IndicatorTask> tasks;
  private List<IndicatorValue> values;

  private Integer minTargetYear;
  private Integer maxTargetYear;

  @Builder
  public IndicatorOverview(
      Double progress,
      IndicatorEntity indicator,
      List<IndicatorTask> tasks,
      List<IndicatorValue> values,
      Integer minTargetYear,
      Integer maxTargetYear) {
    super(progress, indicator);
    this.tasks = tasks;
    this.values = values;
    this.minTargetYear = minTargetYear;
    this.maxTargetYear = maxTargetYear;
  }
}
