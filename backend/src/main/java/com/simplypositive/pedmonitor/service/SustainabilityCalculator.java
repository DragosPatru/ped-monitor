package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorCode;

public interface SustainabilityCalculator {

  boolean applicableFor(String indicatorCode);

  double compute();
}
