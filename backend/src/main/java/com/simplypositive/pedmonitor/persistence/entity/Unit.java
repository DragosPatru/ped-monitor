package com.simplypositive.pedmonitor.persistence.entity;

public enum Unit {
  KWH("kWh"),
  MWH("MWh"),
  EURO("EURO"),

  LITRES("litres");

  private String displayName;

  Unit(String displayName) {
    this.displayName = displayName;
  }
}
