package com.simplypositive.pedmonitor.domain.service;

public class FETSustainabilityCalculator implements SustainabilityCalculator {

  @Override
  public boolean applicableFor(String indicatorCode) {
    return indicatorCode.startsWith("FET");
  }

  @Override
  public double compute() {
    return 0;
  }
}
