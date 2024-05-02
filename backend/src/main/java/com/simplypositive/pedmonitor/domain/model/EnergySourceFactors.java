package com.simplypositive.pedmonitor.domain.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class EnergySourceFactors {

  private Integer reportingYearId;

  @NotNull private Double primaryEnergyFactor;

  @NotNull private Double ghgEmissionFactorElectricity;

  @NotEmpty private String ghgEmissionFactorElectricitySourceCode;

  @NotNull private Double ghgEmissionFactorForHeathColdGenerated;

  @NotEmpty private String ghgEmissionFactorForHeathColdGeneratedSourceCode;
}
