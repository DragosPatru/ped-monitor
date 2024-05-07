package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
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
  private IndicatorEntity indicator;
}
