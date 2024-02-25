package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.api.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.RecordedValue;
import com.simplypositive.pedmonitor.domain.Task;
import com.simplypositive.pedmonitor.service.SustainabilityIndicatorService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SustainabilityIndicatorController implements SustainabilityIndicatorApi {

  private final SustainabilityIndicatorService service;

  @Autowired
  public SustainabilityIndicatorController(SustainabilityIndicatorService service) {
    this.service = service;
  }

  @Override
  public ResponseEntity<SustainabilityIndicatorOverview> getProgress(int indicatorId) {
    return null;
  }

  @Override
  public ResponseEntity<?> addData(int indicatorId, List<RecordedValue> values) {
    return null;
  }

  @Override
  public ResponseEntity<?> addTask(int indicatorId, Task task) {
    return null;
  }
}
