package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
  private TaskStatus status = TaskStatus.INITIAL;
  private Instant createdAt = Instant.now();
  private Instant deadline;

  private double expectedCostReduction;
  private double actualCostReduction;
}
