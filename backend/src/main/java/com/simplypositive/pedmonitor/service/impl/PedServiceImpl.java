package com.simplypositive.pedmonitor.service.impl;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.Sorting;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.persistence.repository.PedRepository;
import com.simplypositive.pedmonitor.service.PedService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PedServiceImpl implements PedService {

  private final PedRepository repository;

  @Autowired
  public PedServiceImpl(PedRepository repository) {
    this.repository = repository;
  }

  @Override
  public PositiveEnergyDistrict create(PositiveEnergyDistrict ped) {
    return repository.save(ped);
  }

  @Override
  public PositiveEnergyDistrict updateName(Integer pedId, String newName)
      throws ResourceNotFoundException {
    PositiveEnergyDistrict ped =
        repository.findById(pedId).orElseThrow(() -> new ResourceNotFoundException("PED", pedId));
    ped.setName(newName);
    return repository.save(ped);
  }

  @Override
  public List<PositiveEnergyDistrict> getAll(SearchCriteria criteria) {
    if (criteria.getSorting() != null) {
      List<Sort.Order> orderList =
          criteria.getSorting().stream().map(this::toOrder).collect(Collectors.toList());
      repository.findAll(Sort.by(orderList));
    }
    return repository.findAll();
  }

  private Sort.Order toOrder(Sorting sorting) {
    return Sort.Order.by(sorting.getField())
        .with(Sort.Direction.valueOf(sorting.getDirection().getValue()));
  }

  private Sort toSort(Sorting sorting) {
    return Sort.by(Sort.Direction.valueOf(sorting.getDirection().getValue()), sorting.getField());
  }
}