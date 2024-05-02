package com.simplypositive.pedmonitor.domain.service;

public interface SustainabilityCalculator {

  boolean applicableFor(String indicatorCode);

  double compute();
}
