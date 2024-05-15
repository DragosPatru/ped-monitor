package com.simplypositive.pedmonitor.application.model;

import com.simplypositive.pedmonitor.domain.model.AnnualReport;
import com.simplypositive.pedmonitor.domain.model.AnnualValue;
import com.simplypositive.pedmonitor.domain.model.IndicatorStats;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedOverview {

  private BigDecimal densityOfFocusDistrict;
  private BigDecimal builtUpDensity;
  private BigDecimal rateOfPeopleReached;
  private PedEntity ped;
  private AnnualReport lastYearReport;
  private Map<String, IndicatorStats> indicatorsStats;
  private Map<String, List<AnnualValue>> kpis;
}
