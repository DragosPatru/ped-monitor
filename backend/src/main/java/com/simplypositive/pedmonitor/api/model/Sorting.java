package com.simplypositive.pedmonitor.api.model;

import java.util.Objects;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** The sorting list to apply to the Medical Diagnosis. */
@Getter
@Setter
@NoArgsConstructor
public class Sorting {

  private SortingDirection direction;
  private String field;

  public Sorting direction(SortingDirection direction) {
    this.direction = direction;
    return this;
  }

  public Sorting field(String field) {
    this.field = field;
    return this;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Sorting sorting = (Sorting) o;
    return Objects.equals(this.direction, sorting.direction)
        && Objects.equals(this.field, sorting.field);
  }

  @Override
  public int hashCode() {
    return Objects.hash(direction, field);
  }
}
