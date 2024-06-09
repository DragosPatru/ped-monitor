package com.simplypositive.pedmonitor.api;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.application.IndicatorHandler;
import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
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
public class IndicatorController implements IndicatorApi {

  private final IndicatorHandler indicatorHandler;
  private final IndicatorService service;
  private final AppConfigurationProperties configProps;

  @Autowired
  public IndicatorController(
      IndicatorHandler indicatorHandler,
      IndicatorService service,
      AppConfigurationProperties configProps) {
    this.indicatorHandler = indicatorHandler;
    this.service = service;
    this.configProps = configProps;
  }

  @Override
  public ResponseEntity<IndicatorOverview> getOverview(Integer indicatorId)
      throws ResourceNotFoundException {
    return ok(indicatorHandler.getOverview(indicatorId));
  }

  @Override
  public ResponseEntity<?> addData(Integer indicatorId, IndicatorValue value)
      throws ResourceNotFoundException {
    return ok(service.addData(indicatorId, value));
  }

  @Override
  public ResponseEntity<?> addTask(Integer indicatorId, IndicatorTask task)
      throws ResourceNotFoundException {
    return ok(service.addTask(indicatorId, task));
  }

  @Override
  public ResponseEntity<?> getData(Integer indicatorId) throws ResourceNotFoundException {
    List<IndicatorValue> values = service.getData(indicatorId);
    return values.isEmpty() ? noContent().build() : ok(values);
  }

  @Override
  public ResponseEntity<?> deleteData(Integer valueId) throws ResourceNotFoundException {
    service.deleteData(valueId);
    return ok().build();
  }

  @Override
  public ResponseEntity<?> getTasks(Integer indicatorId) throws ResourceNotFoundException {
    List<IndicatorTask> tasks = service.getTasks(indicatorId);
    return tasks.isEmpty() ? noContent().build() : ok(tasks);
  }

  @Override
  public ResponseEntity<?> deleteTask(Integer taskId) throws ResourceNotFoundException {
    service.deleteTask(taskId);
    return ok().build();
  }

  @Override
  public ResponseEntity<?> updateTask(Integer taskId, IndicatorTask update)
      throws ResourceNotFoundException {
    update.setId(taskId);
    return ok(indicatorHandler.updateTask(update));
  }
}
