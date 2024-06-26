package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "POSITIVE_ENERGY_DISTRICT")
@Builder
public class PedEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Size(max = 150)
  @NotEmpty
  private String name;

  @NotEmpty
  @Size(max = 150)
  private String countryCode;

  private String description;

  private Instant createdAt = Instant.now();

  @NotNull private Double focusDistrictSize;

  @NotNull private Double buildUpAreaSize;

  @NotNull private Long focusDistrictPopulation;

  @NotNull private Double avgHouseholdIncome;

  private Integer heatingDegreeDays;
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
  // percent of final energy consumption provided by renewable energy generated on-site in baseline
  // year
  private Double percentSelfSupplyRenewableEnergyInBaseline;

  // Acceptance
  private Long peopleReached;
  private Double internalSuccessRate;
  private Double moneySpent;
  private Double returnOfInvestment;

  public PedEntity(
      Integer id,
      String name,
      String countryCode,
      String description,
      Instant createdAt,
      Double focusDistrictSize,
      Double buildUpAreaSize,
      Long focusDistrictPopulation,
      Double avgHouseholdIncome,
      Integer heatingDegreeDays,
      Integer coolingDegreeDays,
      Integer baselineYear,
      Integer targetYear,
      Double percentSelfSupplyRenewableEnergyInBaseline,
      Long peopleReached,
      Double internalSuccessRate,
      Double moneySpent,
      Double returnOfInvestment) {
    this.id = id;
    this.name = name;
    this.countryCode = countryCode;
    this.description = description;
    this.createdAt = createdAt;
    this.focusDistrictSize = focusDistrictSize;
    this.buildUpAreaSize = buildUpAreaSize;
    this.focusDistrictPopulation = focusDistrictPopulation;
    this.avgHouseholdIncome = avgHouseholdIncome;
    this.heatingDegreeDays = heatingDegreeDays;
    this.coolingDegreeDays = coolingDegreeDays;
    this.baselineYear = baselineYear;
    this.targetYear = targetYear;
    this.percentSelfSupplyRenewableEnergyInBaseline = percentSelfSupplyRenewableEnergyInBaseline;
    this.peopleReached = peopleReached;
    this.internalSuccessRate = internalSuccessRate;
    this.moneySpent = moneySpent;
    this.returnOfInvestment = returnOfInvestment;
  }
}
