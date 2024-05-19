package com.simplypositive.pedmonitor;

import java.util.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.util.StringUtils;

@ConfigurationProperties(prefix = "app")
@Getter
@Setter
@NoArgsConstructor
@Slf4j
public class AppConfigurationProperties {

  private Map<String, IndicatorMeta> indicators;

  public IndicatorMeta getMetaData(String code) throws IllegalStateException {
    return Optional.ofNullable(indicators.get(code))
        .orElseThrow(
            () -> new IllegalStateException("Sustainability indicator " + code + " not found"));
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class IndicatorMeta {
    private final String NO_PARENT_VALUE = "NONE";
    public static final String GREEN_HOUSE_KPI_SUFFIX = "_GHG_";
    public static final String FET_PREFIX = "FET";
    public static final String RES_PREFIX = "RES";

    private String unit;
    private String parent;
    private String categoryLabel;
    private boolean kpi;
    private String greenHouseGasEmissionKPI;
    private Set<String> overallKPIS = new HashSet<>(0);

    public boolean hasParent() {
      return !NO_PARENT_VALUE.equalsIgnoreCase(parent);
    }

    public boolean hasGreenHouseEmissionKPI() {
      return StringUtils.hasText(greenHouseGasEmissionKPI);
    }

    public boolean hasOverallKPIs() {
      return overallKPIS != null && !overallKPIS.isEmpty();
    }
  }
}
