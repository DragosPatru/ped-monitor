package com.simplypositive.pedmonitor.application.model;

import static com.simplypositive.pedmonitor.utils.StringUtils.safeTrim;

import com.simplypositive.pedmonitor.domain.model.EnergySourceFactors;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PedUpdateRequest {

  @NotEmpty private String name;

  private String description;

  private Long peopleReached;
  private Double internalSuccessRate;
  private Double moneySpent;
  private Double returnOfInvestment;

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

  public PedExtras pedExtras() {
    return PedExtras.builder()
        .name(name)
        .description(description)
        .peopleReached(peopleReached)
        .internalSuccessRate(internalSuccessRate)
        .moneySpent(moneySpent)
        .returnOfInvestment(returnOfInvestment)
        .build();
  }

  @Getter
  @Setter
  @NoArgsConstructor
  @Builder
  public static class PedExtras {
    private String name;
    private String description;
    private Long peopleReached;
    private Double internalSuccessRate;
    private Double moneySpent;
    private Double returnOfInvestment;

    public PedExtras(
        String name,
        String description,
        Long peopleReached,
        Double internalSuccessRate,
        Double moneySpent,
        Double returnOfInvestment) {
      this.name = name;
      this.description = description;
      this.peopleReached = peopleReached;
      this.internalSuccessRate = internalSuccessRate;
      this.moneySpent = moneySpent;
      this.returnOfInvestment = returnOfInvestment;
    }
  }
}
