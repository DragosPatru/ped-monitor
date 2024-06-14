package com.simplypositive.pedmonitor.domain.model;

import static java.util.Optional.empty;
import static java.util.Optional.of;

import java.math.BigDecimal;
import java.util.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class PedStats {

  Map<String, List<AnnualValue>> kpisByYear = new HashMap<>();
  private OverallStats overallSs;
  private OverallStats overallGhg;
  private BigDecimal overallResGhg;
  private BigDecimal overallTasksProgress;

  public Optional<List<AnnualValue>> kpiByCode(String code) {
    if (kpisByYear == null || !kpisByYear.containsKey(code)) {
      return empty();
    }
    return of(kpisByYear.get(code));
  }

  @Getter
  @Setter
  @AllArgsConstructor
  public static class OverallStats {
    private AnnualValue currentValue;
    private AnnualValue bestValue;
    private AnnualValue baselineValue;
  }
}
