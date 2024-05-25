package com.simplypositive.pedmonitor.domain.model;

import static java.util.Optional.empty;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnualReport {

  private Integer id;
  private Integer pedId;
  private Integer year;
  private EnergySourceFactors energySourceFactors;
  private FetSourceFactors fetSourceFactors;
  private Set<String> resSources;
  private List<KPI> kpis;
  private boolean isCompleted;

  public Optional<KPI> kpiByCode(String code) {
    if (kpis == null) {
      return empty();
    }
    return kpis.stream().filter(kpi -> Objects.equals(code, kpi.getCode())).findFirst();
  }
}
