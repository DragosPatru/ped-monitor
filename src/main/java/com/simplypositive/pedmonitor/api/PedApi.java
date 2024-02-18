package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.SearchResult;
import com.simplypositive.pedmonitor.domain.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicator;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface PedApi {

  ResponseEntity<PositiveEnergyDistrict> create(
      PositiveEnergyDistrict ped, List<SustainabilityIndicator> indicators);

  ResponseEntity<PositiveEnergyDistrict> update(String pedId, PedUpdateRequest updateRequest);

  ResponseEntity<SearchResult<PositiveEnergyDistrict>> search(SearchCriteria criteria);
}
