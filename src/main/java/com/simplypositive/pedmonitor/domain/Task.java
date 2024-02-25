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
@Entity(name = "TASK")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private Integer sustainabilityIndicatorId;

  private String name;
  private TaskStatus status;
  private Instant createdDate;
  private Instant deadline;

  private double expectedCostReduction;
  private double actualCostReduction;
}
