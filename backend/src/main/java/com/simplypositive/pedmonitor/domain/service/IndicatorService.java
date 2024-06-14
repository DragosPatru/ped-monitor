package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.IndicatorStats;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTaskStats;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Set;

public interface IndicatorService {

  IndicatorEntity create(IndicatorEntity indicator);

  List<IndicatorEntity> defineAll(Set<String> indicatorCodes, Integer pedId);

  List<IndicatorEntity> createAll(List<IndicatorEntity> indicators);

  List<IndicatorEntity> getPedIndicators(int pedId);

  List<IndicatorStats> getPedIndicatorsStats(int pedId);

  IndicatorValue addData(Integer indicatorId, IndicatorValue value)
      throws ResourceNotFoundException;

  @Transactional
  IndicatorValue deleteData(Integer valueId) throws ResourceNotFoundException;

  IndicatorTask addTask(Integer indicatorId, IndicatorTask task) throws ResourceNotFoundException;

  IndicatorEntity getById(Integer indicatorId) throws ResourceNotFoundException;

  List<IndicatorValue> getData(Integer indicatorId);

  boolean hasData(Integer indicatorId);

  List<IndicatorValue> getData(Integer indicatorId, Integer year);

  List<IndicatorTask> getTasksStats(Integer indicatorId);

  IndicatorTaskStats getTasksStats(List<IndicatorEntity> indicators);

  IndicatorTask deleteTask(Integer taskId) throws ResourceNotFoundException;

  IndicatorTask updateTask(IndicatorTask task) throws ResourceNotFoundException;

  void deleteAllForPed(Integer pedId);
}
