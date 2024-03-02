package com.simplypositive.pedmonitor.domain;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SustainabilityIndicatorOverview {

  private Double progress;
  private SustainabilityIndicator indicator;
}
