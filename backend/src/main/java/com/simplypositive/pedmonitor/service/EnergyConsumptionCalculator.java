package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorType;
import org.springframework.stereotype.Component;

@Component
public class EnergyConsumptionCalculator implements SustainabilityCalculator {

  private final SustainabilityIndicatorType indicatorType =
      SustainabilityIndicatorType.ELECTRICITY_CONSUMPTION;

  public EnergyConsumptionCalculator(SustainabilityCalculatorRegistry registry) {
    registry.register(this, indicatorType);
  }

  @Override
  public boolean applicableFor(SustainabilityIndicatorType indicatorType) {
    return this.indicatorType.equals(indicatorType);
  }

  @Override
  public double calculateProgress(SustainabilityIndicator indicator, Double targetValue) {
    return 0.0;
  }
}
