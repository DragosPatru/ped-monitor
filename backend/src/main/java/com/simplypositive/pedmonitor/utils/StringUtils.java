package com.simplypositive.pedmonitor.utils;

public class StringUtils {

  private StringUtils() {
    super();
  }

  public static String safeTrim(String value) {
    if (org.springframework.util.StringUtils.hasText(value)) {
      return org.springframework.util.StringUtils.truncate(value.trim(), 250);
    }
    return value;
  }
}
