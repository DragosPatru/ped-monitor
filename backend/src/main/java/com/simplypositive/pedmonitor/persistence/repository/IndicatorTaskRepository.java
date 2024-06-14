package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorTask;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorTaskStats;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorTaskRepository extends CrudRepository<IndicatorTask, Integer> {

  List<IndicatorTask> findAllByIndicatorIdOrderByCreatedAtDesc(Integer indicatorId);

  List<IndicatorTask> findAllByIndicatorIdIn(List<Integer> indicatorIds);

  @Query(
      "SELECT new com.simplypositive.pedmonitor.persistence.entity.IndicatorTaskStats(SUM(t.plannedBudget), SUM(t.actualBudget)) "
          + "FROM INDICATOR_TASK AS t WHERE t.indicatorId in ?1")
  IndicatorTaskStats calculateTasksStatsForIndicatorIdIn(List<Integer> indicatorIds);

  void deleteAllByIndicatorIdIn(List<Integer> indicatorIds);
}
