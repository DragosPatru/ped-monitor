package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorValueRepository extends CrudRepository<RecordedValue, Integer> {

  List<RecordedValue> findAllBySustainabilityIndicatorId(int indicatorId);
}
