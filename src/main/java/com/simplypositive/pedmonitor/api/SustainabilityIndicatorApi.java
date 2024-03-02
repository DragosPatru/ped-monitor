package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface SustainabilityIndicatorApi {

  ResponseEntity<SustainabilityIndicatorOverview> getProgress(int indicatorId) throws ResourceNotFoundException;

  ResponseEntity<?> addData(int indicatorId, List<RecordedValue> values) throws ResourceNotFoundException;

  ResponseEntity<?> addTask(int indicatorId, Task task) throws ResourceNotFoundException;
}
