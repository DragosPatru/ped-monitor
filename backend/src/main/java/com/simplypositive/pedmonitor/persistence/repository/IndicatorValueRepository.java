package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorValue;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorValueRepository
    extends CrudRepository<IndicatorValue, Integer>,
        PagingAndSortingRepository<IndicatorValue, Integer> {

  List<IndicatorValue> findAllByIndicatorId(int indicatorId);

  Page<IndicatorValue> findAllByIndicatorId(int indicatorId, Pageable page);

  List<IndicatorValue> findAllByIndicatorIdAndCreationYear(int indicatorId, int creationYear);

  List<IndicatorValue> findAllByIndicatorIdOrderByCreatedAtDesc(int indicatorId);

  void deleteAllByIndicatorIdIn(List<Integer> indicatorIds);

  //  @Query("select case when count(v)> 0 then true else false end from IndicatorValue v where
  // v.indicatorId == :indicatorId")
  //  boolean existsIndicatorValueByIndicatorId(int indicatorId);
}
