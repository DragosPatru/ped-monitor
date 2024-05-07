package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedOverview {

  private PedEntity ped;
  private AnnualReport currentYearReport;
  private List<SustainabilityIndicatorOverview> indicatorsOverview;
}
