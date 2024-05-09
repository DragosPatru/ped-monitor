package com.simplypositive.pedmonitor.application.model;

import static com.simplypositive.pedmonitor.utils.StringUtils.safeTrim;

import com.simplypositive.pedmonitor.domain.model.EnergySourceFactors;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PedUpdateRequest {

  @NotEmpty private String name;

  private String description;

  // the year for which the factors and data-sources need to be updated
  @NotNull private Integer referenceYear;

  @NotNull private Double primaryEnergyFactor;

  @NotNull private Double ghgEmissionFactorElectricity;

  @NotEmpty private String ghgEmissionFactorElectricitySourceCode;

  @NotNull private Double ghgEmissionFactorForHeathColdGenerated;

  @NotEmpty private String ghgEmissionFactorForHeathColdGeneratedSourceCode;

  public EnergySourceFactors energySourceFactors() {
    return EnergySourceFactors.builder()
        .primaryEnergyFactor(primaryEnergyFactor)
        .ghgEmissionFactorElectricity(ghgEmissionFactorElectricity)
        .ghgEmissionFactorElectricitySourceCode(safeTrim(ghgEmissionFactorElectricitySourceCode))
        .ghgEmissionFactorForHeathColdGenerated(ghgEmissionFactorForHeathColdGenerated)
        .ghgEmissionFactorForHeathColdGeneratedSourceCode(
            safeTrim(ghgEmissionFactorForHeathColdGeneratedSourceCode))
        .build();
  }
}
