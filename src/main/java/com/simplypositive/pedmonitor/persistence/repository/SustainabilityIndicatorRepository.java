package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicator;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SustainabilityIndicatorRepository
    extends CrudRepository<SustainabilityIndicator, Integer> {

  List<SustainabilityIndicator> findAllByPedId(int pedId);
}
