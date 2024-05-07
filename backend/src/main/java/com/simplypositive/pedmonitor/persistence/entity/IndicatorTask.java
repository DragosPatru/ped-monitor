package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "INDICATOR_TASK")
public class IndicatorTask {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @NotNull private Integer indicatorId;

  @NotBlank private String name;
  private ResourceStatus status = ResourceStatus.INITIAL;
  private Instant createdAt = Instant.now();
  private Instant deadline;

  private double expectedCostReduction;
  private double actualCostReduction;
}
