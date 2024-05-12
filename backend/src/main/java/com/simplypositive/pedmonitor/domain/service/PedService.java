package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;

public interface PedService {

  PedEntity create(PedEntity definition);

  PedEntity updateFields(Integer pedId, String newName, String description)
      throws ResourceNotFoundException;

  List<PedEntity> getAll(SearchCriteria criteria);

  PedEntity getById(Integer pedId) throws ResourceNotFoundException;

  void delete(Integer pedId);
}
