package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorType;
import java.util.Optional;

public interface SustainabilityIndicatorRegistry {

  void register(SustainabilityCalculator calculator, SustainabilityIndicatorType indicatorType);

  Optional<SustainabilityCalculator> getCalculator(SustainabilityIndicatorType indicator);
}
