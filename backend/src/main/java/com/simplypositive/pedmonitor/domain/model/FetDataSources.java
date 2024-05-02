package com.simplypositive.pedmonitor.domain.model;

import static java.util.Collections.emptyMap;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FetDataSources {
  private Map<String, Double> sourceFactors = new HashMap<>();

  private FetDataSources(Map<String, Double> sourceFactors) {
    this.sourceFactors = sourceFactors;
  }

  public static FetDataSources ofSouceFactors(Map<String, Double> sourceFactors) {
    if (sourceFactors == null) {
      return new FetDataSources(emptyMap());
    }
    return new FetDataSources(sourceFactors);
  }

  public Optional<Double> factorBySourceCode(String dataSourceCode) {
    return Optional.ofNullable(sourceFactors.get(dataSourceCode));
  }
}
