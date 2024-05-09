package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.ResourceStatus;
import lombok.*;

@Getter
@Setter
public class IndicatorStats {

  private Double progress = 0.0;
  private IndicatorEntity indicator;

  @Builder(builderMethodName = "with")
  public IndicatorStats(Double progress, IndicatorEntity indicator) {
    this.progress = progress;
    this.indicator = indicator;
  }

  public boolean isConfigured() {
    return indicator != null && indicator.getDefinitionStatus() != ResourceStatus.INITIAL;
  }
}
