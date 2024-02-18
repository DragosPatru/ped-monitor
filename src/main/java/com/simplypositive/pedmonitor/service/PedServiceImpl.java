package com.simplypositive.pedmonitor.service;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.domain.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.repository.PedRepository;
import java.util.List;

public class PedServiceImpl implements PedService {

  private final PedRepository repository;

  public PedServiceImpl(PedRepository repository) {
    this.repository = repository;
  }

  @Override
  public PositiveEnergyDistrict create(PositiveEnergyDistrict ped) {
    return null;
  }

  @Override
  public PositiveEnergyDistrict update(String pedId, String newName) {
    return null;
  }

  @Override
  public List<PositiveEnergyDistrict> search(SearchCriteria criteria) {
    return null;
  }

  @Override
  public PedRepository repository() {
    return null;
  }
}
