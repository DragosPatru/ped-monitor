package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.*;
import com.simplypositive.pedmonitor.persistence.entity.PedEntity;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ReportService {

  List<AnnualReport> defineReportsForPed(PedEntity ped, AnnualReportSpec spec);

  void updateEnergySourceFactors(PedEntity ped, Integer year, EnergySourceFactors sourceFactors)
      throws ResourceNotFoundException;

  Optional<AnnualReport> lastYearReport(PedEntity ped);

  List<String> getDataSourceCodes(PedEntity ped, Integer year);

  Map<String, List<AnnualValue>> getKpis(PedEntity ped);
}
