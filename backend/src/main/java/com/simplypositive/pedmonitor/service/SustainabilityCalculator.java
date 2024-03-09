package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorType;

public interface SustainabilityCalculator {

  boolean applicableFor(SustainabilityIndicatorType indicatorType);

  double calculateProgress(SustainabilityIndicator indicator, Double targetValue);
}
