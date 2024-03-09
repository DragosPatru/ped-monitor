package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import java.util.List;

public interface SustainabilityIndicatorService {

  SustainabilityIndicator create(SustainabilityIndicator indicator);

  List<SustainabilityIndicator> createAll(List<SustainabilityIndicator> indicators);

  List<SustainabilityIndicator> getPedIndicators(int pedId);

  SustainabilityIndicatorOverview getProgress(int indicatorId) throws ResourceNotFoundException;

  RecordedValue addData(int indicatorId, RecordedValue values)
      throws ResourceNotFoundException;

  Task addTask(int indicatorId, Task task) throws ResourceNotFoundException;

  List<RecordedValue> getData(int indicatorId)
          throws ResourceNotFoundException;

  List<Task> getTasks(int indicatorId) throws ResourceNotFoundException;
}
