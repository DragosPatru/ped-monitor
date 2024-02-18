package com.simplypositive.pedmonitor.domain;

import java.util.List;

public class SustainabilityIndicator {

  private int pedId;

  private SustainabilityIndicatorType type;
  private Unit unit;
  private Double targetValue;

  private List<RecordedValue> recordedValues;

  private List<Task> plannedTasks;
}
