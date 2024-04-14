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
@Entity(name = "RECORDED_VALUE")
public class RecordedValue {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private Double amount;

  /** the source of data */
  private String dataSourceCode;

  private Integer sustainabilityIndicatorId;

  private Instant createdAt = Instant.now();
}
