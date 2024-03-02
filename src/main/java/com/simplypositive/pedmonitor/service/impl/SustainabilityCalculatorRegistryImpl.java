package com.simplypositive.pedmonitor.service.impl;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorType;
import com.simplypositive.pedmonitor.service.SustainabilityCalculator;
import com.simplypositive.pedmonitor.service.SustainabilityCalculatorRegistry;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class SustainabilityCalculatorRegistryImpl implements SustainabilityCalculatorRegistry {

  private Map<SustainabilityIndicatorType, SustainabilityCalculator> calculatorMap =
      new HashMap<>();

  @Override
  public void register(
      SustainabilityCalculator calculator, SustainabilityIndicatorType indicatorType) {
    calculatorMap.put(indicatorType, calculator);
  }

  @Override
  public Optional<SustainabilityCalculator> getCalculator(SustainabilityIndicatorType indicator) {
    return calculatorMap.get(indicator) == null
        ? Optional.empty()
        : Optional.of(calculatorMap.get(indicator));
  }
}
