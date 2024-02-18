package com.simplypositive.pedmonitor;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorType;
import com.simplypositive.pedmonitor.domain.Unit;

import java.util.Map;
import java.util.Optional;

public class ConfigurationProperties {

    private Map<SustainabilityIndicatorType, IndicatorMeta> indicatorMeta;

    public IndicatorMeta getMetaData(SustainabilityIndicatorType type)
            throws IllegalStateException {
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
