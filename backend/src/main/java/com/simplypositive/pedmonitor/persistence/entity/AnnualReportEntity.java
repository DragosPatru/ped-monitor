package com.simplypositive.pedmonitor.persistence.entity;

import static org.hibernate.engine.jdbc.ClobProxy.generateProxy;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Clob;
import java.sql.SQLException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "ANNUAL_REPORT")
public class AnnualReportEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @NotNull private Integer pedId;

  @NotNull private Integer assignedYear;

  @Lob private Clob fetSourceFactorsJson;
  @Lob private Clob energySourceFactorsJson;
  @Lob private Clob kpisJson;

  private ResourceStatus status = ResourceStatus.IN_PROGRESS;

  public void setFetSourceFactorsJson(String fetSourceFactorsJson) {
    this.fetSourceFactorsJson = generateProxy(fetSourceFactorsJson);
  }

  public void setEnergySourceFactorsJson(String energySourceFactorsJson) {
    this.energySourceFactorsJson = generateProxy(energySourceFactorsJson);
  }

  public void setKpisJson(String kpisJson) {
    this.kpisJson = generateProxy(kpisJson);
  }

  public String energySourceFactorsJson() {
    return clobToString(energySourceFactorsJson);
  }

  public String kpisJson() {
    return clobToString(kpisJson);
  }

  public String fetSourceFactorsJson() {
    return clobToString(fetSourceFactorsJson);
  }

  private String clobToString(Clob data) {
    StringBuilder sb = new StringBuilder();
    try (BufferedReader br = new BufferedReader(data.getCharacterStream())) {
      int b;
      while (-1 != (b = br.read())) {
        sb.append((char) b);
      }

    } catch (SQLException | IOException e) {
      throw new RuntimeException("Failed to convert Stream to String", e);
    }
    return sb.toString();
  }
}
