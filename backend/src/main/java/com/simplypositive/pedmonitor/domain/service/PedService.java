package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;
import java.util.Optional;

public interface PedService {

  PedEntity create(PedEntity definition);

  PedEntity updateFields(Integer pedId, String newName, String description)
      throws ResourceNotFoundException;

  List<PedEntity> getAll(SearchCriteria criteria);

  Optional<PedEntity> getById(Integer pedId);
}
