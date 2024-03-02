package com.simplypositive.pedmonitor.persistence.repository;

import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedRepository extends CrudRepository<PositiveEnergyDistrict, Integer> {}
