package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.AnnualReport;
import com.simplypositive.pedmonitor.domain.model.AnnualReportSpec;
import com.simplypositive.pedmonitor.domain.model.AnnualValue;
import com.simplypositive.pedmonitor.domain.model.EnergySourceFactors;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ReportService {

  List<AnnualReport> defineReportsForPed(PedEntity ped, AnnualReportSpec spec);

  void updateEnergySourceFactors(PedEntity ped, Integer year, EnergySourceFactors sourceFactors)
      throws ResourceNotFoundException;

  Optional<AnnualReport> lastYearReport(PedEntity ped);

  Map<String, List<AnnualValue>> getKpis(PedEntity ped);
}
