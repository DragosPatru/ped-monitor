package com.simplypositive.pedmonitor.persistence.entity;

public enum SustainabilityIndicatorType {
  ELECTRICITY_CONSUMPTION("Electricity Consumption"),
  CO2_EMISSIONS("CO2 Emissions");

  private String displayName;

  SustainabilityIndicatorType(String displayName) {
    this.displayName = displayName;
  }
}
