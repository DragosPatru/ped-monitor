package com.simplypositive.pedmonitor.api;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.application.IndicatorHandler;
import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.application.model.IndicatorUpdateRequest;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
@CrossOrigin
public class SustainabilityIndicatorController implements SustainabilityIndicatorApi {

  private final IndicatorHandler indicatorHandler;
  private final IndicatorService service;
  private final AppConfigurationProperties configProps;

  @Autowired
  public SustainabilityIndicatorController(
      IndicatorHandler indicatorHandler,
      IndicatorService service,
      AppConfigurationProperties configProps) {
    this.indicatorHandler = indicatorHandler;
    this.service = service;
    this.configProps = configProps;
  }

  @Override
  public ResponseEntity<IndicatorOverview> getOverview(int indicatorId)
      throws ResourceNotFoundException {
    return ok(indicatorHandler.getOverview(indicatorId));
  }

  @Override
  public ResponseEntity<IndicatorEntity> update(int indicatorId, IndicatorUpdateRequest request)
      throws ResourceNotFoundException {
    return ok(indicatorHandler.update(indicatorId, request));
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
