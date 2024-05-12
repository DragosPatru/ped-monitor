package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.AnnualReportEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface AnnualReportRepository extends CrudRepository<AnnualReportEntity, Integer> {

  List<AnnualReportEntity> findAllByPedIdAndAssignedYear(Integer pedId, Integer assignedYear);

  void deleteAllByPedId(Integer pedId);
}
