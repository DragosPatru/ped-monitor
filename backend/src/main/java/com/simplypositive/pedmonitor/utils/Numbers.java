package com.simplypositive.pedmonitor.utils;

import java.math.BigDecimal;

public class Numbers {

  public static BigDecimal withDefaultScale(Double value) {
    return BigDecimal.valueOf(value).setScale(4, BigDecimal.ROUND_HALF_UP);
  }

  public static BigDecimal withScale(Double value, int precision) {
    return BigDecimal.valueOf(value).setScale(precision, BigDecimal.ROUND_HALF_UP);
  }
}
