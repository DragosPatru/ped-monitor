package com.simplypositive.pedmonitor.presentation;

import org.springframework.stereotype.Controller;

@Controller
public class PedViews {

  public String pedList() {
    return "pedList";
  }

  public String pedOverview(int pedId) {
    return "pedOverview";
  }
}
