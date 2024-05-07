package com.simplypositive.pedmonitor.api;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import com.simplypositive.pedmonitor.api.model.PedDefinitionRequest;
import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.api.model.SearchResult;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.PedDefinition;
import com.simplypositive.pedmonitor.domain.model.PedOverview;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/peds")
public interface PedApi {

  //  @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
  //  ResponseEntity<PedDefinition> create(@RequestBody PedDefinition pedDefinition);

  @PostMapping(consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
  ResponseEntity<PedDefinition> create(@RequestBody PedDefinitionRequest pedDefinitionRequest);

  @PutMapping(
      value = "/{pedId}",
      consumes = APPLICATION_JSON_VALUE,
      produces = APPLICATION_JSON_VALUE)
  ResponseEntity<PedEntity> update(
      @PathVariable Integer pedId, @RequestBody PedUpdateRequest updateRequest)
      throws ResourceNotFoundException;

  @PostMapping(
      value = "/search",
      consumes = APPLICATION_JSON_VALUE,
      produces = APPLICATION_JSON_VALUE)
  ResponseEntity<SearchResult<PedEntity>> search();

  @GetMapping(value = "/{pedId}/overview", produces = APPLICATION_JSON_VALUE)
  ResponseEntity<PedOverview> getOverview(@PathVariable Integer pedId)
      throws ResourceNotFoundException;
}
