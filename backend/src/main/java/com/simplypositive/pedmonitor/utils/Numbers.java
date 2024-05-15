package com.simplypositive.pedmonitor.utils;

import java.math.BigDecimal;

public class Numbers {

  public static BigDecimal fromDouble(Double value) {
    return BigDecimal.valueOf(value).setScale(4, BigDecimal.ROUND_HALF_UP);
  }
}
