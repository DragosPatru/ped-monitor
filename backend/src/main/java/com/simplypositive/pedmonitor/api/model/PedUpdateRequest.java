package com.simplypositive.pedmonitor.api.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PedUpdateRequest {

  @NotEmpty
  private String name;

  private String description;

  @NotNull
  private Double primaryEnergyFactor;

  @NotNull private Double ghgEmissionFactorElectricity;

  @NotEmpty
  private String ghgEmissionFactorElectricitySourceCode;

  @NotNull private Double ghgEmissionFactorForHeathColdGenerated;

  @NotEmpty private String ghgEmissionFactorForHeathColdGeneratedSourceCode;
}
