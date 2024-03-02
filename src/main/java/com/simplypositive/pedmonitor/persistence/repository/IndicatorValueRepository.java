package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.RecordedValue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorValueRepository extends CrudRepository<RecordedValue, Integer> {}
