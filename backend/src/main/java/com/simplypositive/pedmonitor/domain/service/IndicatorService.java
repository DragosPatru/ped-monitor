package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.IndicatorOverview;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.List;
import java.util.Set;

public interface IndicatorService {

  IndicatorEntity create(IndicatorEntity indicator);

  List<IndicatorEntity> defineAll(Set<String> indicatorCodes, Integer pedId);

  List<IndicatorEntity> createAll(List<IndicatorEntity> indicators);

  List<IndicatorEntity> getPedIndicators(int pedId);

  List<IndicatorOverview> getPedIndicatorsOverview(int pedId);

  IndicatorOverview getProgress(int indicatorId) throws ResourceNotFoundException;

  IndicatorValue addData(int indicatorId, IndicatorValue values) throws ResourceNotFoundException;

  IndicatorTask addTask(int indicatorId, IndicatorTask task) throws ResourceNotFoundException;

  List<IndicatorValue> getData(int indicatorId) throws ResourceNotFoundException;

  List<IndicatorTask> getTasks(int indicatorId) throws ResourceNotFoundException;
}
