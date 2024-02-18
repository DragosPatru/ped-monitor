package com.simplypositive.pedmonitor.repository;

import com.simplypositive.pedmonitor.domain.RecordedValue;
import org.springframework.data.repository.CrudRepository;

public interface IndicatorValueRepository extends CrudRepository<RecordedValue, Integer> {}
