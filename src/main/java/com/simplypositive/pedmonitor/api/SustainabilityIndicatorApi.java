package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.api.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.RecordedValue;
import com.simplypositive.pedmonitor.domain.Task;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface SustainabilityIndicatorApi {

  ResponseEntity<SustainabilityIndicatorOverview> getProgress(int indicatorId);

  ResponseEntity<?> addData(int indicatorId, List<RecordedValue> values);

  ResponseEntity<?> addTask(int indicatorId, Task task);
}
