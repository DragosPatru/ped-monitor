package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.api.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.RecordedValue;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicator;
import com.simplypositive.pedmonitor.domain.Task;
import java.util.List;

public interface SustainabilityIndicatorService {

  List<SustainabilityIndicator> getPedIndicators(int pedId);

  SustainabilityIndicatorOverview getProgress(int indicatorId);

  SustainabilityIndicator addData(int indicatorId, List<RecordedValue> values);

  SustainabilityIndicator addTask(int indicatorId, Task task);

  SustainabilityIndicatorRegistry registry();

  SustainabilityIndicatorRegistry repository();
}
