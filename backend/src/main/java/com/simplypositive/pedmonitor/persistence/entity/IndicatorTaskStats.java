package com.simplypositive.pedmonitor.persistence.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndicatorTaskStats {
  private Double totalPlannedBudget;
  private Double totalActualBudget;

  public IndicatorTaskStats(Double totalPlannedBudget, Double totalActualBudget) {
    this.totalPlannedBudget = totalPlannedBudget;
    this.totalActualBudget = totalActualBudget;
  }
}
