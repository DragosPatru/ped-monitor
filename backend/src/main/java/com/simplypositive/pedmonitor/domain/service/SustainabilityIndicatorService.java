package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import java.util.List;
import java.util.Set;

public interface SustainabilityIndicatorService {

  SustainabilityIndicator create(SustainabilityIndicator indicator);

  List<SustainabilityIndicator> defineAll(Set<String> indicatorCodes, Integer pedId);

  List<SustainabilityIndicator> createAll(List<SustainabilityIndicator> indicators);

  List<SustainabilityIndicator> getPedIndicators(int pedId);

  SustainabilityIndicatorOverview getProgress(int indicatorId) throws ResourceNotFoundException;

  RecordedValue addData(int indicatorId, RecordedValue values) throws ResourceNotFoundException;

  Task addTask(int indicatorId, Task task) throws ResourceNotFoundException;

  List<RecordedValue> getData(int indicatorId) throws ResourceNotFoundException;

  List<Task> getTasks(int indicatorId) throws ResourceNotFoundException;
}
