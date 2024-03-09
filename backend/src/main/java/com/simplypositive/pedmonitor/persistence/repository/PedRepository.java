package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedRepository extends CrudRepository<PositiveEnergyDistrict, Integer> {
  List<PositiveEnergyDistrict> findAll(Sort sort);

  List<PositiveEnergyDistrict> findAll();
}
