package com.simplypositive.pedmonitor.domain;

import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
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

  private PositiveEnergyDistrict ped;
  private List<SustainabilityIndicatorOverview> indicatorsOverview;
}
