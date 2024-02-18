package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.api.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.RecordedValue;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicator;
import com.simplypositive.pedmonitor.domain.Task;
import com.simplypositive.pedmonitor.repository.SustainabilityIndicatorRepository;
import java.util.List;

public class SustainabilityIndicatorServiceImpl implements SustainabilityIndicatorService {

  private final SustainabilityIndicatorRegistry registry;
  private final SustainabilityIndicatorRepository repository;

  public SustainabilityIndicatorServiceImpl(
      SustainabilityIndicatorRegistry registry, SustainabilityIndicatorRepository repository) {
    this.registry = registry;
    this.repository = repository;
  }

  @Override
  public List<SustainabilityIndicator> getPedIndicators(int pedId) {
    return null;
  }

  @Override
  public SustainabilityIndicatorOverview getProgress(int indicatorId) {
    return null;
  }

  @Override
  public SustainabilityIndicator addData(int indicatorId, List<RecordedValue> values) {
    return null;
  }

  @Override
  public SustainabilityIndicator addTask(int indicatorId, Task task) {
    return null;
  }

  @Override
  public SustainabilityIndicatorRegistry registry() {
    return null;
  }

  @Override
  public SustainabilityIndicatorRegistry repository() {
    return null;
  }
}
