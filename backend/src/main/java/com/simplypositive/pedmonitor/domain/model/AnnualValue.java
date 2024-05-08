package com.simplypositive.pedmonitor.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnnualValue {

  private Integer year;
  private Double value;
}
