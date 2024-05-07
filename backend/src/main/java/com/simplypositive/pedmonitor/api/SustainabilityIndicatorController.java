package com.simplypositive.pedmonitor.api;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class SustainabilityIndicatorController implements SustainabilityIndicatorApi {

  private final IndicatorService service;
  private final AppConfigurationProperties configProps;

  @Autowired
  public SustainabilityIndicatorController(
      IndicatorService service, AppConfigurationProperties configProps) {
    this.service = service;
    this.configProps = configProps;
  }

  @Override
  public ResponseEntity<SustainabilityIndicatorOverview> getProgress(int indicatorId)
      throws ResourceNotFoundException {
    return ok(service.getProgress(indicatorId));
  }

  @Override
  public ResponseEntity<?> addData(int indicatorId, IndicatorValue value)
      throws ResourceNotFoundException {
    return ok(service.addData(indicatorId, value));
  }

  @Override
  public ResponseEntity<?> addTask(int indicatorId, IndicatorTask task)
      throws ResourceNotFoundException {
    return ok(service.addTask(indicatorId, task));
  }

  @Override
  public ResponseEntity<?> getData(int indicatorId) throws ResourceNotFoundException {
    List<IndicatorValue> values = service.getData(indicatorId);
    return values.isEmpty() ? noContent().build() : ok(values);
  }

  @Override
  public ResponseEntity<?> getTasks(int indicatorId, IndicatorTask task)
      throws ResourceNotFoundException {
    List<IndicatorTask> tasks = service.getTasks(indicatorId);
    return tasks.isEmpty() ? noContent().build() : ok(tasks);
  }
}
