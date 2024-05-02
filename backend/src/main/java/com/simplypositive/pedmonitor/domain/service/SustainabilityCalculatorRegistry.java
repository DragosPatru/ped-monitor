package com.simplypositive.pedmonitor.domain.service;

import java.util.Optional;

public interface SustainabilityCalculatorRegistry {

  void register(SustainabilityCalculator calculator, String indicatorCode);

  Optional<SustainabilityCalculator> getCalculator(String indicatorCode);
}
