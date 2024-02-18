package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicator;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorType;

public interface SustainabilityCalculator {

  boolean aplicableFor(SustainabilityIndicatorType indicatorType);

  boolean calculateProgress(SustainabilityIndicator indicator, Double targetValue);
}
