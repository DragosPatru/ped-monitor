package com.simplypositive.pedmonitor.application.model;

import com.simplypositive.pedmonitor.domain.model.IndicatorStats;
import com.simplypositive.pedmonitor.persistence.entity.IndicatorEntity;
import java.time.LocalDate;
import java.util.List;
import lombok.*;

@Getter
@Setter
public class IndicatorOverview extends IndicatorStats {

  private Integer minTargetYear;
  private Integer maxTargetYear;
  private List<String> dataSourceCodes;

  public boolean isAllowDataChanges() {
    int currentYear = LocalDate.now().getYear();
    return currentYear >= minTargetYear && currentYear <= maxTargetYear;
  }

  @Builder
  public IndicatorOverview(
      Double progress,
      IndicatorEntity indicator,
      Integer minTargetYear,
      Integer maxTargetYear,
      List<String> dataSourceCodes) {
    super(progress, indicator);
    this.minTargetYear = minTargetYear;
    this.maxTargetYear = maxTargetYear;
    this.dataSourceCodes = dataSourceCodes;
  }
}
