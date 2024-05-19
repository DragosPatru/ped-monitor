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
  private BigDecimal overallRes;
  private BigDecimal overallGhg;
  private BigDecimal overallResGhg;

  public Optional<List<AnnualValue>> kpiByCode(String code) {
    if (kpisByYear == null || !kpisByYear.containsKey(code)) {
      return empty();
    }
    return of(kpisByYear.get(code));
  }
}
