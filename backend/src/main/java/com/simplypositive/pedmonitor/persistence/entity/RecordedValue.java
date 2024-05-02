package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.time.LocalDate;
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

  @NotNull private Double amount;

  /** the source of data */
  @NotBlank private String dataSourceCode;

  @NotNull private Integer sustainabilityIndicatorId;

  private Instant creationTime = Instant.now();
  private Integer creationYear = LocalDate.now().getYear();
}
