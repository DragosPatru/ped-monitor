package com.simplypositive.pedmonitor.repository;

import com.simplypositive.pedmonitor.domain.PositiveEnergyDistrict;
import org.springframework.data.repository.CrudRepository;

public interface PedRepository extends CrudRepository<PositiveEnergyDistrict, Integer> {}
