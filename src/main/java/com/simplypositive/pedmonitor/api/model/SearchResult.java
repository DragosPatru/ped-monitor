package com.simplypositive.pedmonitor.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResult<T> {

  private List<T> data;

  public static <T> SearchResult<T> ofData(List<T> data) {
    return new SearchResult<>(data);
  }
}
