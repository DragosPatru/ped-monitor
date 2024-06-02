package com.simplypositive.pedmonitor.api;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.simplypositive.pedmonitor.application.model.IndicatorOverview;
import com.simplypositive.pedmonitor.application.model.IndicatorUpdateRequest;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/indicators")
public interface IndicatorApi {

  @GetMapping(value = "/{indicatorId}/overview", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<IndicatorOverview> getOverview(@PathVariable @NotNull Integer indicatorId)
      throws ResourceNotFoundException;

  @PutMapping(value = "/{indicatorId}", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<IndicatorEntity> update(
      @PathVariable @NotNull Integer indicatorId,
      @RequestBody @Valid IndicatorUpdateRequest request)
      throws ResourceNotFoundException;

  @PostMapping(
      value = "/{indicatorId}/values",
      consumes = APPLICATION_JSON_VALUE,
      produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> addData(
      @PathVariable @NotNull Integer indicatorId, @RequestBody @Valid IndicatorValue value)
      throws ResourceNotFoundException;

  @GetMapping(value = "/{indicatorId}/values", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> getData(@PathVariable @NotNull Integer indicatorId)
      throws ResourceNotFoundException;

  @DeleteMapping(value = "/values/{valueId}", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> deleteData(@PathVariable @NotNull Integer valueId)
      throws ResourceNotFoundException;

  @PostMapping(
      value = "/{indicatorId}/tasks",
      consumes = APPLICATION_JSON_VALUE,
      produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> addTask(
      @PathVariable @NotNull Integer indicatorId, @RequestBody @Valid IndicatorTask task)
      throws ResourceNotFoundException;

  @GetMapping(value = "/{indicatorId}/tasks", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> getTasks(@PathVariable @NotNull Integer indicatorId)
      throws ResourceNotFoundException;

  @DeleteMapping(value = "/tasks/{taskId}", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> deleteTask(@PathVariable @NotNull Integer taskId)
      throws ResourceNotFoundException;

  @PutMapping(value = "/tasks/{taskId}", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<?> updateTask(
      @PathVariable @NotNull Integer taskId, @RequestBody @Valid IndicatorTask update)
      throws ResourceNotFoundException;
}
