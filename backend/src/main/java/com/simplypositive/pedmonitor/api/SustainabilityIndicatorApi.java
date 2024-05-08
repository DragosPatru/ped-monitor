package com.simplypositive.pedmonitor.api;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.IndicatorOverview;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/indicators")
public interface SustainabilityIndicatorApi {

  @GetMapping(value = "/{indicatorId}/overview", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<IndicatorOverview> getProgress(@PathVariable int indicatorId)
      throws ResourceNotFoundException;

  @PutMapping(
      value = "/{indicatorId}/data",
      consumes = APPLICATION_JSON_VALUE,
      produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> addData(@PathVariable int indicatorId, @RequestBody IndicatorValue value)
      throws ResourceNotFoundException;

  @PutMapping(
      value = "/{indicatorId}/task",
      consumes = APPLICATION_JSON_VALUE,
      produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> addTask(int indicatorId, IndicatorTask task) throws ResourceNotFoundException;

  @GetMapping(value = "/{indicatorId}/data", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> getData(@PathVariable int indicatorId) throws ResourceNotFoundException;

  @GetMapping(value = "/{indicatorId}/tasks", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> getTasks(int indicatorId, IndicatorTask task) throws ResourceNotFoundException;
}
