package com.simplypositive.pedmonitor.api.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class PedDefinitionRequest {

    @Size(max = 150)
    @NotEmpty private String name;

    @NotEmpty
    private String countryCode;

    @Size(max = 250)
    private String description;

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
    @Min(2000)
    // baseline year for the calculation of progress in energy consumption and emissions generation
    private Integer baselineYear;

    @NotNull
    @Min(2000)
    // target year set up by the user to achieve PED status
    private Integer targetYear;

    @NotNull
    // percent of final energy consumption provided by renewable energy generated on-site in baseline year
    private Double percentRenewableEnergyInBaseline;

    @NotNull
    //total quantity of GHG emissions in baseline year
    private Double ghgEmissionsTotalInBaseline;

    @NotNull
    private Double primaryEnergyFactor;

    @NotNull
    private Double ghgEmissionFactorElectricity;

    @NotEmpty
    private String ghgEmissionFactorElectricitySourceCode;

    @NotNull
    private Double ghgEmissionFactorForHeathColdGenerated;

    @NotEmpty
    private String ghgEmissionFactorForHeathColdGeneratedSourceCode;

    @NotEmpty
    private Set<String> indicators;

    @NotEmpty
    private Set<String> fetDataSources;
}
