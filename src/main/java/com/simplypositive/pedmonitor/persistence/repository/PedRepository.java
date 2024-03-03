package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedRepository extends CrudRepository<PositiveEnergyDistrict, Integer> {
    List<PositiveEnergyDistrict> findAll(Sort sort);

    List<PositiveEnergyDistrict> findAll();
}
