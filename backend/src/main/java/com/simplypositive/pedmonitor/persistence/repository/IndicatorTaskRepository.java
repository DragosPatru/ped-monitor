package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorTaskRepository extends CrudRepository<IndicatorTask, Integer> {

  List<IndicatorTask> findAllByIndicatorIdOrderByCreatedAtDesc(Integer indicatorId);
}
