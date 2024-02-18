package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.domain.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.repository.PedRepository;
import java.util.List;

public interface PedService {

  PositiveEnergyDistrict create(PositiveEnergyDistrict ped);

  PositiveEnergyDistrict update(String pedId, String newName);

  List<PositiveEnergyDistrict> search(SearchCriteria criteria);

  PedRepository repository();
}
