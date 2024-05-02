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

  @NotNull private Integer pedId;

  @NotBlank private String name;

  @NotBlank private String code;

  @NotBlank private String unit;

  @NotNull private Double targetValue;

  @NotBlank private String category;

  @NotBlank private String parentIndicatorCode;

  private Instant createdAt = Instant.now();
}
