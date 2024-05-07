package com.simplypositive.pedmonitor.domain.model;

import java.util.Set;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnualReportSpec {

  private Set<String> indicators;
  private EnergySourceFactors energySourceFactors;
  private Set<String> fetDataSources;
}
