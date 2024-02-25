package com.simplypositive.pedmonitor.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "SUSTAINABILITY_INDICATOR")
public class SustainabilityIndicator {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private Integer pedId;

  private String name;
  private SustainabilityIndicatorType type;
  private Unit unit;
  private Double targetValue;

}
