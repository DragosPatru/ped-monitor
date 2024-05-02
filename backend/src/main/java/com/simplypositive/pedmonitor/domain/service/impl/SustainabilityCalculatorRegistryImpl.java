package com.simplypositive.pedmonitor.domain.service.impl;

import com.simplypositive.pedmonitor.domain.service.SustainabilityCalculator;
import com.simplypositive.pedmonitor.domain.service.SustainabilityCalculatorRegistry;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class SustainabilityCalculatorRegistryImpl implements SustainabilityCalculatorRegistry {

  private Map<String, SustainabilityCalculator> calculatorMap = new HashMap<>();

  @Override
  public void register(SustainabilityCalculator calculator, String indicatorCode) {
    if (calculatorMap.getOrDefault(indicatorCode, null) != null) {
      throw new IllegalStateException("Calculator already registered for " + indicatorCode);
    }
    calculatorMap.put(indicatorCode, calculator);
  }

  @Override
  public Optional<SustainabilityCalculator> getCalculator(String indicatorCode) {
    return calculatorMap.get(indicatorCode) == null
        ? Optional.empty()
        : Optional.of(calculatorMap.get(indicatorCode));
  }
}
