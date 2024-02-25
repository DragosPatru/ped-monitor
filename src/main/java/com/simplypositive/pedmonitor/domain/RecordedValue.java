package com.simplypositive.pedmonitor.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "RECORDED_VALUE")
public class RecordedValue {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private Double amount;
  private Instant created;

  private Integer sustainabilityIndicatorId;
}
