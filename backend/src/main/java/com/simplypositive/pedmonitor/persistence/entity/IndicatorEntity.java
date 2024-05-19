package com.simplypositive.pedmonitor.persistence.entity;

import static com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "SUSTAINABILITY_INDICATOR")
@AllArgsConstructor
@Builder
public class IndicatorEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @NotNull private Integer pedId;

  @NotBlank private String code;

  @NotBlank private String unit;

  private Double targetValue;

  private Integer targetYear;

  private double totalValue = 0.0;

  @NotBlank private String category;

  @NotBlank private String parentIndicatorCode;

  /*
   * It is completely defined when the target value and year are completed
   * */
  @NotNull private ResourceStatus definitionStatus = ResourceStatus.INITIAL;

  private Instant createdAt = Instant.now();

  public LocalDate getEndOfTargetYear() {
    if (targetYear == null) {
      return null;
    }
    return LocalDate.of(targetYear, 12, 31);
  }

  public Instant getDemoCreatedAt() {
    return Instant.now();
  }

  public boolean isGreenHouseEmissions() {
    return code.endsWith(GREEN_HOUSE_KPI_SUFFIX);
  }

  public boolean isFET() {
    return code.startsWith(FET_PREFIX);
  }

  public boolean isRES() {
    return code.startsWith(RES_PREFIX);
  }
}
