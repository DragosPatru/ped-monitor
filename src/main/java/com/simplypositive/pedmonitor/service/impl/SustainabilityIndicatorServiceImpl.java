package com.simplypositive.pedmonitor.service.impl;

import static java.util.stream.StreamSupport.stream;

import com.simplypositive.pedmonitor.domain.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import com.simplypositive.pedmonitor.persistence.repository.IndicatorValueRepository;
import com.simplypositive.pedmonitor.persistence.repository.SustainabilityIndicatorRepository;
import com.simplypositive.pedmonitor.persistence.repository.TaskRepository;
import com.simplypositive.pedmonitor.service.SustainabilityCalculator;
import com.simplypositive.pedmonitor.service.SustainabilityCalculatorRegistry;
import com.simplypositive.pedmonitor.service.SustainabilityIndicatorService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SustainabilityIndicatorServiceImpl implements SustainabilityIndicatorService {

  private final SustainabilityCalculatorRegistry registry;
  private final SustainabilityIndicatorRepository repository;

  private final IndicatorValueRepository valueRepository;
  private final TaskRepository taskRepository;

  public SustainabilityIndicatorServiceImpl(
      SustainabilityCalculatorRegistry registry,
      SustainabilityIndicatorRepository repository,
      IndicatorValueRepository valueRepository,
      TaskRepository taskRepository) {
    this.registry = registry;
    this.repository = repository;
    this.valueRepository = valueRepository;
    this.taskRepository = taskRepository;
  }

  @Override
  public SustainabilityIndicator create(SustainabilityIndicator indicator) {
    return repository.save(indicator);
  }

  @Override
  public List<SustainabilityIndicator> createAll(List<SustainabilityIndicator> indicators) {
    List<SustainabilityIndicator> savedIndicators = new ArrayList();
    if (indicators != null && !indicators.isEmpty()) {
      stream(repository.saveAll(indicators).spliterator(), false)
          .forEach(i -> savedIndicators.add(i));
    }
    return savedIndicators;
  }

  @Override
  public List<SustainabilityIndicator> getPedIndicators(int pedId) {
    return repository.findAllByPedId(pedId);
  }

  @Override
  public SustainabilityIndicatorOverview getProgress(int indicatorId)
      throws ResourceNotFoundException {
    SustainabilityIndicator indicator = findByIdElseThrow(indicatorId);
    SustainabilityCalculator calculator =
        registry
            .getCalculator(indicator.getType())
            .orElseThrow(
                () -> new ResourceNotFoundException("Sustainability calculator not defined"));

    double progress = calculator.calculateProgress(indicator, indicator.getTargetValue());
    return new SustainabilityIndicatorOverview(progress, indicator);
  }


  @Override
  public RecordedValue addData(int indicatorId, RecordedValue value)
          throws ResourceNotFoundException {
    findByIdElseThrow(indicatorId);
    value.setSustainabilityIndicatorId(indicatorId);
    return valueRepository.save(value);
  }

  public List<RecordedValue> addData(int indicatorId, List<RecordedValue> values)
      throws ResourceNotFoundException {
    findByIdElseThrow(indicatorId);
    List<RecordedValue> savedValues = new ArrayList();
    if (values != null && !values.isEmpty()) {
      values.forEach(
          value -> {
            value.setSustainabilityIndicatorId(indicatorId);
          });
      stream(valueRepository.saveAll(values).spliterator(), false).forEach(i -> savedValues.add(i));
    }
    return savedValues;
  }

  @Override
  public Task addTask(int indicatorId, Task task) throws ResourceNotFoundException {
    findByIdElseThrow(indicatorId);
    task.setSustainabilityIndicatorId(indicatorId);
    return taskRepository.save(task);
  }

  @Override
  public List<RecordedValue> getData(int indicatorId) throws ResourceNotFoundException {
    return valueRepository.findAllBySustainabilityIndicatorId(indicatorId);
  }

  @Override
  public List<Task> getTasks(int indicatorId) throws ResourceNotFoundException {
    return taskRepository.findAllBySustainabilityIndicatorId(indicatorId);
  }

  private SustainabilityIndicator findByIdElseThrow(int indicatorId)
      throws ResourceNotFoundException {
    return repository
        .findById(indicatorId)
        .orElseThrow(() -> new ResourceNotFoundException("SustainabilityIndicator", indicatorId));
  }
}
