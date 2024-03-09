package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import java.util.List;
import java.util.Optional;

public interface PedService {

  PositiveEnergyDistrict create(PositiveEnergyDistrict ped);

  PositiveEnergyDistrict updateName(Integer pedId, String newName) throws ResourceNotFoundException;

  List<PositiveEnergyDistrict> getAll(SearchCriteria criteria);

  Optional<PositiveEnergyDistrict> getById(Integer pedId);
}
