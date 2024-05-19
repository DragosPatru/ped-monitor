package com.simplypositive.pedmonitor.domain.model;

import static com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta.*;

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
  public boolean isGreenHouseEmissions() {
    return code.endsWith(GREEN_HOUSE_KPI_SUFFIX);
  }

  public String baseCode() {
    if (isGreenHouseEmissions()) {
      return code.replace(GREEN_HOUSE_KPI_SUFFIX, "");
    }
    return code;
  }

  public boolean isFET() {
    return code.startsWith(FET_PREFIX);
  }

  public boolean isRES() {
    return code.startsWith(RES_PREFIX);
  }
}
