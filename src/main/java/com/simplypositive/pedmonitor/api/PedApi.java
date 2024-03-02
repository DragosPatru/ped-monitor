package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.SearchResult;
import com.simplypositive.pedmonitor.domain.PedDefinition;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import org.springframework.http.ResponseEntity;

public interface PedApi {

  ResponseEntity<PedDefinition> create(PedDefinition pedDefinition);

  ResponseEntity<PositiveEnergyDistrict> update(Integer pedId, PedUpdateRequest updateRequest)
      throws ResourceNotFoundException;

  ResponseEntity<SearchResult<PositiveEnergyDistrict>> search(SearchCriteria criteria);
}
