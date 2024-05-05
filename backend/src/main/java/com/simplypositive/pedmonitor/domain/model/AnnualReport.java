package com.simplypositive.pedmonitor.domain.model;

import java.util.List;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnualReport {

  private Integer id;
  private Integer year;
  private EnergySourceFactors energySourceFactors;
  private FetSourceFactors fetSourceFactors;
  private List<KPI> kpis;
}
