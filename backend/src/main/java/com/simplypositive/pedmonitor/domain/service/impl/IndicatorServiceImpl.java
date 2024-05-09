package com.simplypositive.pedmonitor.domain.service.impl;

import static java.util.stream.StreamSupport.stream;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.IndicatorStats;
import com.simplypositive.pedmonitor.domain.service.IndicatorService;
import com.simplypositive.pedmonitor.domain.service.SustainabilityCalculatorRegistry;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import com.simplypositive.pedmonitor.persistence.entity.ResourceStatus;
import com.simplypositive.pedmonitor.persistence.repository.IndicatorRepository;
import com.simplypositive.pedmonitor.persistence.repository.IndicatorTaskRepository;
import com.simplypositive.pedmonitor.persistence.repository.IndicatorValueRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IndicatorServiceImpl implements IndicatorService {

  private final SustainabilityCalculatorRegistry registry;
  private final IndicatorRepository repository;

  private final IndicatorValueRepository valueRepository;
  private final IndicatorTaskRepository taskRepository;

  private final AppConfigurationProperties props;

  @Autowired
  public IndicatorServiceImpl(
      SustainabilityCalculatorRegistry registry,
      IndicatorRepository repository,
      IndicatorValueRepository valueRepository,
      IndicatorTaskRepository taskRepository,
      AppConfigurationProperties props) {
    this.registry = registry;
    this.repository = repository;
    this.valueRepository = valueRepository;
    this.taskRepository = taskRepository;
    this.props = props;
  }

  @Override
  @Transactional
  public IndicatorEntity create(IndicatorEntity indicator) {
    return repository.save(indicator);
  }

  @Override
  public IndicatorEntity configure(int indicatorId, Double targetValue, Integer targetYear)
      throws ResourceNotFoundException {
    if (targetValue == null || targetValue < 0 && targetValue > LocalDate.now().getYear()) {
      throw new IllegalArgumentException("invalid data to configure an indicator");
    }
    IndicatorEntity indicator = getById(indicatorId);
    indicator.setTargetValue(targetValue);
    indicator.setTargetYear(targetYear);
    return repository.save(indicator);
  }

  @Override
  public List<IndicatorEntity> defineAll(Set<String> indicatorCodes, Integer pedId) {
    if (pedId == null || pedId <= 0) {
      throw new IllegalArgumentException("pedId - must be a valid value");
    }

    List<IndicatorEntity> indicators = new ArrayList<>();
    for (String indicatorCode : indicatorCodes) {
      IndicatorMeta indicatorMeta = props.getMetaData(indicatorCode);
      if (indicatorMeta != null) {
        IndicatorEntity indicator =
            IndicatorEntity.builder()
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
  public List<IndicatorEntity> createAll(List<IndicatorEntity> indicators) {
    List<IndicatorEntity> savedIndicators = new ArrayList();
    if (indicators != null && !indicators.isEmpty()) {
      stream(repository.saveAll(indicators).spliterator(), false)
          .forEach(i -> savedIndicators.add(i));
    }
    return savedIndicators;
  }

  @Override
  public List<IndicatorEntity> getPedIndicators(int pedId) {
    return repository.findAllByPedId(pedId);
  }

  @Override
  public List<IndicatorStats> getPedIndicatorsStats(int pedId) {
    return repository.findAllByPedId(pedId).stream()
        .map(i -> IndicatorStats.with().indicator(i).progress(0.0).build())
        .toList();
  }

  @Override
  public IndicatorStats getStats(int indicatorId) throws ResourceNotFoundException {
    IndicatorEntity indicator = findByIdElseThrow(indicatorId);
    //    SustainabilityCalculator calculator =
    //        registry
    //            .getCalculator(indicator.getCode())
    //            .orElseThrow(
    //                () -> new ResourceNotFoundException("Sustainability calculator not defined"));

    // TODO
    double progress = 0.0;
    return new IndicatorStats(progress, indicator);
  }

  @Override
  @Transactional
  public IndicatorValue addData(int indicatorId, IndicatorValue value)
      throws ResourceNotFoundException {
    IndicatorEntity indicator = findByIdElseThrow(indicatorId);
    indicator.setTotalValue(indicator.getTotalValue() + value.getAmount());
    repository.save(indicator);
    value.setIndicatorId(indicatorId);
    return valueRepository.save(value);
  }

  @Transactional
  public List<IndicatorValue> addData(int indicatorId, List<IndicatorValue> values)
      throws ResourceNotFoundException {
    IndicatorEntity indicator = findByIdElseThrow(indicatorId);
    List<IndicatorValue> savedValues = new ArrayList();
    if (values != null && !values.isEmpty()) {
      values.forEach(
          value -> {
            value.setIndicatorId(indicatorId);
            indicator.setTotalValue(indicator.getTotalValue() + value.getAmount());
          });
      stream(valueRepository.saveAll(values).spliterator(), false).forEach(i -> savedValues.add(i));
    }

    repository.save(indicator);
    return savedValues;
  }

  @Override
  @Transactional
  public IndicatorTask addTask(int indicatorId, IndicatorTask task)
      throws ResourceNotFoundException {
    findByIdElseThrow(indicatorId);
    task.setIndicatorId(indicatorId);
    return taskRepository.save(task);
  }

  @Override
  public IndicatorEntity getById(int indicatorId) throws ResourceNotFoundException {
    return findByIdElseThrow(indicatorId);
  }

  @Override
  public List<IndicatorValue> getData(int indicatorId) throws ResourceNotFoundException {
    return valueRepository.findAllByIndicatorId(indicatorId);
  }

  @Override
  public List<IndicatorTask> getTasks(int indicatorId) throws ResourceNotFoundException {
    return taskRepository.findAllByIndicatorId(indicatorId);
  }

  private IndicatorEntity findByIdElseThrow(int indicatorId) throws ResourceNotFoundException {
    return repository
        .findById(indicatorId)
        .orElseThrow(() -> new ResourceNotFoundException("SustainabilityIndicator", indicatorId));
  }
}
