package com.simplypositive.pedmonitor.api;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import com.simplypositive.pedmonitor.service.SustainabilityIndicatorService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class SustainabilityIndicatorController implements SustainabilityIndicatorApi {

  private final SustainabilityIndicatorService service;
  private final AppConfigurationProperties configProps;

  @Autowired
  public SustainabilityIndicatorController(SustainabilityIndicatorService service, AppConfigurationProperties configProps) {
    this.service = service;
      this.configProps = configProps;
  }

  @Override
  public ResponseEntity<SustainabilityIndicatorOverview> getProgress(int indicatorId)
      throws ResourceNotFoundException {
    return ok(service.getProgress(indicatorId));
  }

  @Override
  public ResponseEntity<SustainabilityIndicatorsMeta> getIndicatorsMeta() throws ResourceNotFoundException {
    SustainabilityIndicatorsMeta meta = new SustainabilityIndicatorsMeta();
    configProps.getIndicatorMeta().keySet().forEach(type -> {
      IndicatorMeta metaInfo = configProps.getMetaData(type);
      meta.addMeta(type, metaInfo.getTarget(), metaInfo.getUnit());
    });
    return ok(meta);
  }

  @Override
  public ResponseEntity<?> addData(int indicatorId, RecordedValue value)
      throws ResourceNotFoundException {
    return ok(service.addData(indicatorId, value));
  }

  @Override
  public ResponseEntity<?> addTask(int indicatorId, Task task) throws ResourceNotFoundException {
    return ok(service.addTask(indicatorId, task));
  }

  @Override
  public ResponseEntity<?> getData(int indicatorId) throws ResourceNotFoundException {
    List<RecordedValue> values = service.getData(indicatorId);
    return values.isEmpty() ? noContent().build() : ok(values);
  }

  @Override
  public ResponseEntity<?> getTasks(int indicatorId, Task task) throws ResourceNotFoundException {
    List<Task> tasks = service.getTasks(indicatorId);
    return tasks.isEmpty() ? noContent().build() : ok(tasks);
  }
}
