package com.simplypositive.pedmonitor.application.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IndicatorUpdateRequest {

  @NotNull
  @Min(0)
  private Double targetValue;

  @NotNull private Integer targetYear;
}
