package com.simplypositive.pedmonitor.domain.model;

import static com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta.*;

import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class KPI {

  private double value = 0.0;
  private String code;

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
    return IndicatorMeta.isFET(code);
  }

  public boolean isRES() {
    return IndicatorMeta.isRES(code);
  }
}
