package com.simplypositive.pedmonitor;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorType;
import com.simplypositive.pedmonitor.domain.Unit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;
import java.util.Optional;

@ConfigurationProperties(prefix = "app")
@Getter
@Setter
@NoArgsConstructor
public class AppConfigurationProperties {

  private Map<SustainabilityIndicatorType, IndicatorMeta> indicatorMeta;

  public IndicatorMeta getMetaData(SustainabilityIndicatorType type) throws IllegalStateException {
    return Optional.ofNullable(indicatorMeta.get(type))
        .orElseThrow(
            () ->
                new IllegalStateException(
                    "Sustainability indicator " + type.name() + " not found"));
  }

  public static class IndicatorMeta {

    private Double target;
    private Unit unit;
  }
}
