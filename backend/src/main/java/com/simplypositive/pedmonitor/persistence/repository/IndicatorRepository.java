package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndicatorRepository extends CrudRepository<IndicatorEntity, Integer> {

  List<IndicatorEntity> findAllByPedId(int pedId);

  void deleteAllByPedId(Integer pedId);
}
