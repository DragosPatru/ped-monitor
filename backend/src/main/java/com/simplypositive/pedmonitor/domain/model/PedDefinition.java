package com.simplypositive.pedmonitor.domain.model;

import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedDefinition {

  @NotNull @Valid private PedEntity ped;
  @NotEmpty @Valid private List<AnnualReport> annualReports;

  public static PedDefinition ofPed(PedEntity ped, List<AnnualReport> annualReports) {
    PedDefinition pedDefinition = new PedDefinition();
    pedDefinition.setPed(ped);
    pedDefinition.setAnnualReports(annualReports);
    return pedDefinition;
  }
}
