package com.simplypositive.pedmonitor.domain.service.impl;

import static java.util.stream.StreamSupport.stream;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.SustainabilityIndicatorOverview;
import com.simplypositive.pedmonitor.domain.service.SustainabilityCalculator;
import com.simplypositive.pedmonitor.domain.service.SustainabilityCalculatorRegistry;
import com.simplypositive.pedmonitor.domain.service.SustainabilityIndicatorService;
import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import com.simplypositive.pedmonitor.persistence.entity.ResourceStatus;
import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import com.simplypositive.pedmonitor.persistence.entity.Task;
import com.simplypositive.pedmonitor.persistence.repository.IndicatorValueRepository;
import com.simplypositive.pedmonitor.persistence.repository.SustainabilityIndicatorRepository;
import com.simplypositive.pedmonitor.persistence.repository.TaskRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SustainabilityIndicatorServiceImpl implements SustainabilityIndicatorService {

  private final SustainabilityCalculatorRegistry registry;
  private final SustainabilityIndicatorRepository repository;

  private final IndicatorValueRepository valueRepository;
  private final TaskRepository taskRepository;

  private final AppConfigurationProperties props;

  @Autowired
  public SustainabilityIndicatorServiceImpl(
      SustainabilityCalculatorRegistry registry,
      SustainabilityIndicatorRepository repository,
      IndicatorValueRepository valueRepository,
      TaskRepository taskRepository,
      AppConfigurationProperties props) {
    this.registry = registry;
    this.repository = repository;
    this.valueRepository = valueRepository;
    this.taskRepository = taskRepository;
    this.props = props;
  }

  @Override
  @Transactional
  public SustainabilityIndicator create(SustainabilityIndicator indicator) {
    return repository.save(indicator);
  }

  @Override
  public List<SustainabilityIndicator> defineAll(Set<String> indicatorCodes, Integer pedId) {
    if (pedId == null || pedId <= 0) {
      throw new IllegalArgumentException("pedId - must be a valid value");
    }

    List<SustainabilityIndicator> indicators = new ArrayList<>();
    for (String indicatorCode : indicatorCodes) {
      IndicatorMeta indicatorMeta = props.getMetaData(indicatorCode);
      if (indicatorMeta != null) {
        SustainabilityIndicator indicator =
            SustainabilityIndicator.builder()
                .code(indicatorCode)
                .parentIndicatorCode(indicatorMeta.getParent())
                .unit(indicatorMeta.getUnit())
                .category(indicatorMeta.getCategoryLabel())
                .pedId(pedId)
                .definitionStatus(ResourceStatus.INITIAL)
                .build();
        indicators.add(indicator);
      }
    }

    if (indicators.isEmpty()) {
      return indicators;

    } else {
      return this.createAll(indicators);
    }
  }

  @Override
  @Transactional
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
            .getCalculator(indicator.getCode())
            .orElseThrow(
                () -> new ResourceNotFoundException("Sustainability calculator not defined"));

    double progress = calculator.compute();
    return new SustainabilityIndicatorOverview(progress, indicator);
  }

  @Override
  @Transactional
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
  @Transactional
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
