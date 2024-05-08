package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;
import java.util.Map;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedOverview {

  private double densityOfFocusDistrict;
  private double builtUpDensity;
  private PedEntity ped;
  private AnnualReport lastYearReport;
  private Map<String, IndicatorOverview> indicatorsOverview;
  private Map<String, List<AnnualValue>> kpis;
}
