package com.simplypositive.pedmonitor.persistence.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "SUSTAINABILITY_INDICATOR")
public class SustainabilityIndicator {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private Integer pedId;

  @NotBlank private String name;

  @NotNull
  @Enumerated(EnumType.STRING)
  private SustainabilityIndicatorType type;

  @NotNull private Unit unit;

  @NotNull private Double targetValue;

  private Instant createdAt = Instant.now();
}
