package com.simplypositive.pedmonitor.persistence.entity;

import static com.simplypositive.pedmonitor.utils.Numbers.withDefaultScale;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
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

  @NotNull private ResourceStatus status = ResourceStatus.INITIAL;

  @NotNull private Instant createdAt = Instant.now();
  @NotNull private LocalDate deadline;

  @NotNull private Double plannedBudget;
  private Double actualBudget;

  private EnergySavedUnit energySavedUnit;
  private Double expectedEnergySaved;
  private Double actualEnergySaved;

  @Transient
  public List<EnergySavedUnit> getEnergySavedUnits() {
    if (this.getEnergySavedUnit() != null) {
      return List.of(EnergySavedUnit.values());
    }
    return List.of(this.getEnergySavedUnit());
  }

  @Transient
  public ResourceStatus getNextStatus() {
    return ResourceStatus.DONE;
  }

  @Transient
  public LocalDate getCreationDate() {
    return LocalDate.ofInstant(createdAt, ZoneOffset.UTC);
  }

  @Transient
  public boolean isEditable() {
    return ResourceStatus.DONE != status;
  }

  @Transient
  public BigDecimal getRemainingBudgetPercentage() {
    double value = 100;
    if (actualBudget != null && plannedBudget != null) {
      value = (1 - actualBudget / plannedBudget) * 100;
    } else {
      value = plannedBudget > 0 ? 100 : 0;
    }
    return withDefaultScale(value);
  }

  public void setExpense(double expense) {
    double actualBudget = this.getActualBudget() != null ? this.getActualBudget() : 0.0;
    this.setActualBudget(actualBudget + expense);
  }

  public enum EnergySavedUnit {
    MWh_EURO("MWh/EURO"),
    MWh("MWh");

    private static final List<String> UNITS = List.of("MWh", "MWh/EURO");
    private String unit;

    EnergySavedUnit(String unit) {
      this.unit = unit;
    }

    public static List<String> getUnits() {
      return UNITS;
    }
  }
}
