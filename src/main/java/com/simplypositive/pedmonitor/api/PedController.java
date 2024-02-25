package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.api.model.PedUpdateRequest;
import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.SearchResult;
import com.simplypositive.pedmonitor.domain.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.domain.SustainabilityIndicator;
import com.simplypositive.pedmonitor.service.PedService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PedController implements PedApi {

  private final PedService pedService;

  @Autowired
  public PedController(PedService pedService) {
    this.pedService = pedService;
  }

  @Override
  public ResponseEntity<PositiveEnergyDistrict> create(
      PositiveEnergyDistrict ped, List<SustainabilityIndicator> indicators) {
    return null;
  }

  @Override
  public ResponseEntity<PositiveEnergyDistrict> update(
      String pedId, PedUpdateRequest updateRequest) {
    return null;
  }

  @Override
  public ResponseEntity<SearchResult<PositiveEnergyDistrict>> search(SearchCriteria criteria) {
    return null;
  }
}
