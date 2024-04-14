package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorCode;
import java.util.Optional;

public interface SustainabilityCalculatorRegistry {

  void register(SustainabilityCalculator calculator, String indicatorCode);

  Optional<SustainabilityCalculator> getCalculator(String indicatorCode);
}
