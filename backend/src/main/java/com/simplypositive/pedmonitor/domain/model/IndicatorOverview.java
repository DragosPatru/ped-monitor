package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.ResourceStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IndicatorOverview {

  private Double progress;
  private IndicatorEntity indicator;

  public boolean isConfigured() {
    return indicator != null && indicator.getDefinitionStatus() != ResourceStatus.INITIAL;
  }
}
