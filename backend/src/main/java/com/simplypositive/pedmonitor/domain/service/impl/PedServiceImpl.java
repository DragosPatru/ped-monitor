package com.simplypositive.pedmonitor.domain.service.impl;

import static java.time.Instant.now;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.Sorting;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import com.simplypositive.pedmonitor.persistence.repository.PedRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PedServiceImpl implements PedService {

  private final PedRepository pedRepo;

  @Autowired
  public PedServiceImpl(PedRepository pedRepo) {
    this.pedRepo = pedRepo;
  }

  @Override
  @Transactional
  public PedEntity create(PedEntity ped) {
    if (ped.getId() != null) {
      throw new IllegalArgumentException("Could not create a PED with existing ID");
    }
    ped.setCreatedAt(now());
    return pedRepo.save(ped);
  }

  @Override
  public PedEntity updateFields(Integer pedId, String newName, String description)
      throws ResourceNotFoundException {
    PedEntity ped =
        pedRepo.findById(pedId).orElseThrow(() -> new ResourceNotFoundException("PED", pedId));
    ped.setName(newName);
    ped.setDescription(description);
    return pedRepo.save(ped);
  }

  @Override
  public List<PedEntity> getAll(SearchCriteria criteria) {
    if (criteria.getSorting() != null) {
      List<Sort.Order> orderList =
          criteria.getSorting().stream().map(this::toOrder).collect(Collectors.toList());
      pedRepo.findAll(Sort.by(orderList));
    }
    return pedRepo.findAll();
  }

  @Override
  public PedEntity getById(Integer pedId) throws ResourceNotFoundException {
    return pedRepo
        .findById(pedId)
        .orElseThrow(() -> new ResourceNotFoundException("PED not found", pedId));
  }

  @Override
  @Transactional
  public void delete(Integer pedId) {
    pedRepo.deleteById(pedId);
  }

  private Sort.Order toOrder(Sorting sorting) {
    return Sort.Order.by(sorting.getField())
        .with(Sort.Direction.valueOf(sorting.getDirection().getValue()));
  }

  private Sort toSort(Sorting sorting) {
    return Sort.by(Sort.Direction.valueOf(sorting.getDirection().getValue()), sorting.getField());
  }
}
