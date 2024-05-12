package com.simplypositive.pedmonitor.domain.model;

import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FetSourceFactors {
  private Map<String, Double> sourceFactors = new HashMap<>();

  private FetSourceFactors(Map<String, Double> sourceFactors) {
    this.sourceFactors = sourceFactors;
  }

  public static FetSourceFactors of(Map<String, Double> sourceFactors) {
    if (sourceFactors == null) {
      return new FetSourceFactors(emptyMap());
    }
    return new FetSourceFactors(sourceFactors);
  }

  public Optional<Double> factorBySourceCode(String dataSourceCode) {
    return Optional.ofNullable(sourceFactors.get(dataSourceCode));
  }

  public List<String> getDataSources() {
    if (sourceFactors.isEmpty()) {
      return emptyList();
    }
    return sourceFactors.keySet().stream().sorted().toList();
  }
}
