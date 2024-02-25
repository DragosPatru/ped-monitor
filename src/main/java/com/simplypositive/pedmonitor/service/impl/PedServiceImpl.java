package com.simplypositive.pedmonitor.service.impl;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.domain.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.repository.PedRepository;
import com.simplypositive.pedmonitor.service.PedService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
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
