package com.simplypositive.pedmonitor;

import java.util.Map;
import java.util.Optional;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;

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
            () ->
                new IllegalStateException(
                    "Sustainability indicator " + code + " not found"));
  }

  @PostConstruct
  public void test() {
    log.debug("Test");
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class IndicatorMeta {
    private final String NO_PARENT_VALUE = "NONE";

    private String unit;
    private String parent;
    private String categoryLabel;

    public boolean hasParent() {
      return !NO_PARENT_VALUE.equalsIgnoreCase(parent);
    }

  }
}
