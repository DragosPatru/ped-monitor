package com.simplypositive.pedmonitor.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class KPI {

  private double value = 0.0;
  private String code;

  // isIndicator
  // indicatorId
  // si atunci am doar KPIs nu mai am indicator stats
}
