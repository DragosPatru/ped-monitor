package com.simplypositive.pedmonitor.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "POSITIVE_ENERGY_DISTRICT")
public class PositiveEnergyDistrict {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
  private String name;

  private Instant created;
  private Instant startDate;
  private Instant endDate;
}
