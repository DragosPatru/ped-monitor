package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.SearchResult;
import com.simplypositive.pedmonitor.application.PedDefinitionHandler;
import com.simplypositive.pedmonitor.domain.PedDefinition;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.service.PedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PedController implements PedApi {

  private final PedService pedService;
  private final PedDefinitionHandler pedDefinitionHandler;

  @Autowired
  public PedController(PedService pedService, PedDefinitionHandler pedDefinitionHandler) {
    this.pedService = pedService;
    this.pedDefinitionHandler = pedDefinitionHandler;
  }

  @Override
  public ResponseEntity<PedDefinition> create(PedDefinition pedDefinition) {
    return ResponseEntity.ok(pedDefinitionHandler.create(pedDefinition));
  }

  @Override
  public ResponseEntity<PositiveEnergyDistrict> update(
      Integer pedId, PedUpdateRequest updateRequest) {
    try {
      return ResponseEntity.ok(pedService.updateName(pedId, updateRequest.getName()));

    } catch (ResourceNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @Override
  public ResponseEntity<SearchResult<PositiveEnergyDistrict>> search(SearchCriteria criteria) {
    return null;
  }
}
