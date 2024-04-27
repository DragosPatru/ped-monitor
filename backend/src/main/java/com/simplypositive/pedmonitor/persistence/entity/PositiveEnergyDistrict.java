package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.sql.Clob;
import java.time.Instant;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "POSITIVE_ENERGY_DISTRICT")
public class PositiveEnergyDistrict {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Size(max = 150)
  @NotEmpty private String name;

  @Size(max = 250)
  private String description;

  private Instant createdAt = Instant.now();

  @Min(1)
  @NotNull
  private Double totalAreaSize;
  @Min(1)
  @NotNull
  private Double buildUpAreaSize;

  @Min(1)
  @NotNull
  private Long numberOfCitizens;

  @Min(1)
  private Integer heatingDegreeDays;
  @Min(1)
  private Integer coolingDegreeDays;

  @NotNull
  @Min(1900)
  // baseline year for the calculation of progress in energy consumption and emissions generation
  private Integer baselineYear;

  @NotNull
  @Min(1900)
  // target year set up by the user to achieve PED status
  private Integer targetYear;

  @NotNull
  // percent of final energy consumption provided by renewable energy generated on-site in baseline year
  private Double percentRenewableEnergyInBaseline;

  @NotNull
  //total quantity of GHG emissions in baseline year
  private Double ghgEmissionsTotalInBaseline;
}
