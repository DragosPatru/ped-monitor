package com.simplypositive.pedmonitor.domain.service;

import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

@Service
public class DataSourceFactors {

  public static final String ELECTRICITY_CODE = "electricity";
  public static final String LOCALLY_PRODUCED_HEAT_COLD_CODE = "locally_produced_heat_cold";

  private Wrapper dataSourceFactors;

  private final ObjectMapper objectMapper;

  @Autowired
  public DataSourceFactors(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
    try {

      byte[] file = readConfigFile();
      this.dataSourceFactors = objectMapper.readValue(file, Wrapper.class);

    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private byte[] readConfigFile() throws IOException {
    try (InputStream stream =
        this.getClass().getClassLoader().getResourceAsStream("data-source-factors.json")) {
      return stream.readAllBytes();
    }
  }

  private Resource loadEmployeesWithClassPathResource() {
    return new ClassPathResource("data-source-factors.json");
  }

  public Optional<Double> getLastFactorForSource(String dataSourceCode) {
    Optional<DataSources> dataSources = dataSourceFactors.getMostRecent();
    if (dataSources.isEmpty()) {
      return empty();
    }
    DataSourceFactor factor = dataSources.get().getByCode(dataSourceCode).orElse(null);
    if (factor != null) {
      return ofNullable(factor.getValue());
    }
    return empty();
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class Wrapper {
    private List<DataSources> dataSourceFactors = new ArrayList<>();

    public void setDataSourceFactors(List<DataSources> dataSources) {
      this.dataSourceFactors = new ArrayList<>(dataSources);
      sortDataSourceFactorsByYearDesc();
    }

    /** Sorts the dataSourceFactors list by year in descending order. */
    private void sortDataSourceFactorsByYearDesc() {
      Collections.sort(dataSourceFactors, (o1, o2) -> o2.getYear().compareTo(o1.getYear()));
    }

    /**
     * Returns the most recent data source (the first one in the list assuming it is already
     * sorted).
     *
     * @return Optional<DataSources> representing the most recent data source.
     */
    public Optional<DataSources> getMostRecent() {
      return dataSourceFactors.isEmpty() ? Optional.empty() : Optional.of(dataSourceFactors.get(0));
    }
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class DataSources {
    private Integer year;
    private Map<String, DataSourceFactor> data = new HashMap<>();

    public Optional<DataSourceFactor> getByCode(String code) {
      return ofNullable(data.get(code));
    }
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class DataSourceFactor {
    private Double value;
  }
}
