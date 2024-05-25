package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "INDICATOR_VALUE")
public class IndicatorValue {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @NotNull
  @Min(0)
  private Double amount;

  /** the source of data */
  @NotBlank private String dataSourceCode;

  @NotNull private Integer indicatorId;

  private LocalDate createdAt = LocalDate.now();
  private Integer creationYear;

}
