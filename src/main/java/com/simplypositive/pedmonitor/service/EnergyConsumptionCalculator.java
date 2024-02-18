package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicator;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorType;

public class EnergyConsumptionCalculator implements SustainabilityCalculator {

  @Override
  public boolean aplicableFor(SustainabilityIndicatorType indicatorType) {
    return false;
  }

  @Override
  public boolean calculateProgress(SustainabilityIndicator indicator, Double targetValue) {
    return false;
  }
}
