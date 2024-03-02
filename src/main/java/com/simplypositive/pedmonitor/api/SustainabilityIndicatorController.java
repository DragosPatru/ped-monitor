package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import com.simplypositive.pedmonitor.service.SustainabilityIndicatorService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RestController
public class SustainabilityIndicatorController implements SustainabilityIndicatorApi {

  private final SustainabilityIndicatorService service;

  @Autowired
  public SustainabilityIndicatorController(SustainabilityIndicatorService service) {
    this.service = service;
  }

  @Override
  public ResponseEntity<SustainabilityIndicatorOverview> getProgress(int indicatorId) throws ResourceNotFoundException {
    return ok(service.getProgress(indicatorId));
  }

  @Override
  public ResponseEntity<?> addData(int indicatorId, List<RecordedValue> values) throws ResourceNotFoundException {
    return ok(service.addData(indicatorId, values));
  }

  @Override
  public ResponseEntity<?> addTask(int indicatorId, Task task) throws ResourceNotFoundException {
    return ok(service.addTask(indicatorId, task));
  }
}
