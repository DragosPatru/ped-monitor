package com.simplypositive.pedmonitor.domain;

public enum SustainabilityIndicatorType {
  ELECTRICITY_CONSUMPTION("Electricity Consumption"),
  CO2_EMISSIONS("CO2 Emissions");

  private String displayName;

  SustainabilityIndicatorType(String displayName) {
    this.displayName = displayName;
  }
}
