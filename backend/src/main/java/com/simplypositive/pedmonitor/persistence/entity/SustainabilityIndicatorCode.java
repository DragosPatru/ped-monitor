package com.simplypositive.pedmonitor.persistence.entity;

public enum SustainabilityIndicatorCode {
  ELECTRICITY_CONSUMPTION("Electricity Consumption"),
  CO2_EMISSIONS("CO2 Emissions");

  private final String displayName;

  SustainabilityIndicatorCode(String displayName) {
    this.displayName = displayName;
  }

  public String getDisplayName() {
    return displayName;
  }
}
