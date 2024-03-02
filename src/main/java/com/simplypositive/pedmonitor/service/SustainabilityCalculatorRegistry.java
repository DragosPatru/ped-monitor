package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorType;
import java.util.Optional;

public interface SustainabilityCalculatorRegistry {

  void register(SustainabilityCalculator calculator, SustainabilityIndicatorType indicatorType);

  Optional<SustainabilityCalculator> getCalculator(SustainabilityIndicatorType indicator);
}
