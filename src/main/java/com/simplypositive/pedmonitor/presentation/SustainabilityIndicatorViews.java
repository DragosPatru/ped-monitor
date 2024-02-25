package com.simplypositive.pedmonitor.presentation;

import org.springframework.stereotype.Controller;

@Controller
public class SustainabilityIndicatorViews {

  public String indicator(int indicatorId) {
    return "indicatorOverview";
  }
}
