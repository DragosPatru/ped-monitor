package com.simplypositive.pedmonitor.application.model;

import static com.simplypositive.pedmonitor.utils.StringUtils.safeTrim;

import com.simplypositive.pedmonitor.domain.model.EnergySourceFactors;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PedDefinitionRequest {

  @Size(max = 150)
  @NotEmpty
  private String name;

  @NotEmpty private String country;

  @Size(max = 250)
  private String description;

  @Min(1)
  @NotNull
  private Double focusDistrictSize;

  @Min(1)
  @NotNull
  private Double buildUpAreaSize;

  @Min(1)
  @NotNull
  private Long focusDistrictPopulation;

  @Min(1)
  @NotNull
  private Double avgHouseholdIncome;

  @Min(1)
  private Integer heatingDegreeDays;

  @Min(1)
  private Integer coolingDegreeDays;

  @NotNull
  @Min(2000)
  // baseline year for the calculation of progress in energy consumption and emissions generation
  private Integer baselineYear;

  @NotNull
  @Min(2000)
  // target year set up by the user to achieve PED status
  private Integer targetYear;

  @NotNull
  // percent of final energy consumption provided by renewable energy generated on-site in baseline
  // year
  private Double percentSelfSupplyRenewableEnergyInBaseline;

  @NotNull
  // total quantity of GHG emissions in baseline year
  private Double ghgEmissionsTotalInBaseline;

  @NotNull private Double primaryEnergyFactor;

  @NotNull private Double ghgEmissionFactorElectricity;

  @NotEmpty private String ghgEmissionFactorElectricitySource;

  @NotNull private Double ghgEmissionFactorForHeathColdGenerated;

  @NotEmpty private String ghgEmissionFactorForHeathColdGeneratedSource;

  @NotEmpty private Set<String> indicators;

  @NotEmpty private Set<String> fetDataSources;

  private Set<String> resDataSources;

  public PedEntity pedData() {
    PedEntity ped =
        PedEntity.builder()
            .name(safeTrim(name))
            .description(safeTrim(description))
            .countryCode(safeTrim(country))
            .baselineYear(baselineYear)
            .targetYear(targetYear)
            .coolingDegreeDays(coolingDegreeDays)
            .heatingDegreeDays(heatingDegreeDays)
            .buildUpAreaSize(buildUpAreaSize)
            .focusDistrictSize(focusDistrictSize)
            .focusDistrictPopulation(focusDistrictPopulation)
            .avgHouseholdIncome(avgHouseholdIncome)
            .ghgEmissionsTotalInBaseline(ghgEmissionsTotalInBaseline)
            .percentSelfSupplyRenewableEnergyInBaseline(percentSelfSupplyRenewableEnergyInBaseline)
            .build();
    return ped;
  }

  public EnergySourceFactors energySourceFactors() {
    return EnergySourceFactors.builder()
        .primaryEnergyFactor(primaryEnergyFactor)
        .ghgEmissionFactorElectricity(ghgEmissionFactorElectricity)
        .ghgEmissionFactorElectricitySource(safeTrim(ghgEmissionFactorElectricitySource))
        .ghgEmissionFactorForHeathColdGenerated(ghgEmissionFactorForHeathColdGenerated)
        .ghgEmissionFactorForHeathColdGeneratedSource(
            safeTrim(ghgEmissionFactorForHeathColdGeneratedSource))
        .build();
  }
}
