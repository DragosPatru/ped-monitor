package com.simplypositive.pedmonitor.api.model;

/** The sorting order for the given field. */
public enum SortingDirection {
  asc("asc"),

  desc("desc");

  private String value;

  SortingDirection(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static SortingDirection fromValue(String value) {
    for (SortingDirection b : SortingDirection.values()) {
      if (b.value.equals(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }
}
