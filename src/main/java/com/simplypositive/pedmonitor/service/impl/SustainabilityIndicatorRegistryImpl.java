package com.simplypositive.pedmonitor.service.impl;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorType;
import com.simplypositive.pedmonitor.service.SustainabilityCalculator;
import com.simplypositive.pedmonitor.service.SustainabilityIndicatorRegistry;

import java.util.Optional;

public class SustainabilityIndicatorRegistryImpl implements SustainabilityIndicatorRegistry {

    @Override
    public void register(SustainabilityCalculator calculator, SustainabilityIndicatorType indicatorType) {

    }

    @Override
    public Optional<SustainabilityCalculator> getCalculator(SustainabilityIndicatorType indicator) {
        return Optional.empty();
    }
}
