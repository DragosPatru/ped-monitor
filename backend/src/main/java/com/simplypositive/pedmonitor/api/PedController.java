package com.simplypositive.pedmonitor.api;

import static org.springframework.http.ResponseEntity.ok;

import com.simplypositive.pedmonitor.api.model.PedDefinitionRequest;
import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.SearchResult;
import com.simplypositive.pedmonitor.application.PedDefinitionHandler;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.PedDefinition;
import com.simplypositive.pedmonitor.domain.model.PedOverview;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class PedController implements PedApi {

  private final PedService pedService;
  private final PedDefinitionHandler pedDefinitionHandler;

  @Autowired
  public PedController(PedService pedService, PedDefinitionHandler pedDefinitionHandler) {
    this.pedService = pedService;
    this.pedDefinitionHandler = pedDefinitionHandler;
  }

  @Override
  public ResponseEntity<PedDefinition> create(PedDefinitionRequest request) {
    pedDefinitionHandler.createPedDefinition(request);
    return ok().build();
  }

  @Override
  public ResponseEntity<PositiveEnergyDistrict> update(
      Integer pedId, PedUpdateRequest updateRequest) {
    try {
      return ok(pedService.updateName(pedId, updateRequest.getName()));

    } catch (ResourceNotFoundException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @Override
  public ResponseEntity<SearchResult<PositiveEnergyDistrict>> search() {
    List<PositiveEnergyDistrict> peds = pedService.getAll(new SearchCriteria());
    return ok(SearchResult.ofData(peds));
  }

  @Override
  public ResponseEntity<PedOverview> getOverview(Integer pedId) throws ResourceNotFoundException {
    return ok(pedDefinitionHandler.getOverview(pedId));
  }
}
