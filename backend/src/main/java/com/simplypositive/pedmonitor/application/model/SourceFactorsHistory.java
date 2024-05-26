package com.simplypositive.pedmonitor.application.model;

import com.simplypositive.pedmonitor.domain.model.EnergySourceFactors;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SourceFactorsHistory {

  private List<EnergySourceFactors> energySourceFactors;
}
