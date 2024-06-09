package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import lombok.*;

@Getter
@Setter
public class IndicatorStats {

  private Double progress = 0.0;
  private IndicatorEntity indicator;
  private boolean hasData;

  @Builder(builderMethodName = "with")
  public IndicatorStats(Double progress, IndicatorEntity indicator, boolean hasData) {
    this.progress = progress;
    this.indicator = indicator;
    this.hasData = hasData;
  }
}
