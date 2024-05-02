package com.simplypositive.pedmonitor.persistence.entity;

import static org.hibernate.engine.jdbc.ClobProxy.generateProxy;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.sql.Clob;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "REPORTING_YEAR")
public class ReportingYear {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @NotNull private Integer pedId;

  @NotNull private Integer assignedYear;

  @Lob private Clob fetSourcesFactorsJson;
  @Lob private Clob energySourceFactorsJson;
  @Lob private Clob kpisJson;

  public void setFetSourcesFactorsJson(String fetSourcesFactorsJson) {
    this.fetSourcesFactorsJson = generateProxy(fetSourcesFactorsJson);
  }

  public void setEnergySourceFactorsJson(String energySourceFactorsJson) {
    this.energySourceFactorsJson = generateProxy(energySourceFactorsJson);
  }

  public void setKpisJson(String kpisJson) {
    this.kpisJson = generateProxy(kpisJson);
  }
}
