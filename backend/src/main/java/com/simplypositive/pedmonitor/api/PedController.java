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
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
@CrossOrigin
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
    return ok(pedDefinitionHandler.createPedDefinition(request));
  }

  @Override
  public ResponseEntity<PedEntity> update(Integer pedId, PedUpdateRequest updateRequest) {
    try {
      return ok(pedDefinitionHandler.updatePedDefinition(pedId, updateRequest));

    } catch (ResourceNotFoundException e) {
      return ResponseEntity.internalServerError().build();
    }
  }

  @Override
  public ResponseEntity<SearchResult<PedEntity>> search() {
    List<PedEntity> peds = pedService.getAll(new SearchCriteria());
    return ok(SearchResult.ofData(peds));
  }

  @Override
  public ResponseEntity<PedOverview> getOverview(Integer pedId) throws ResourceNotFoundException {
    PedOverview overview = pedDefinitionHandler.getOverview(pedId);
    System.out.println(overview);
    return ok(overview);
  }
}
