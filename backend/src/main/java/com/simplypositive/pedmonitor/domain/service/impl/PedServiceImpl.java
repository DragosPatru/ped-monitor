package com.simplypositive.pedmonitor.domain.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.simplypositive.pedmonitor.api.model.SearchCriteria;
import com.simplypositive.pedmonitor.api.model.Sorting;
import com.simplypositive.pedmonitor.domain.exception.DataProcessingException;
import com.simplypositive.pedmonitor.domain.exception.ResourceNotFoundException;
import com.simplypositive.pedmonitor.domain.model.PedDefinition;
import com.simplypositive.pedmonitor.domain.service.PedService;
import com.simplypositive.pedmonitor.persistence.entity.PositiveEnergyDistrict;
import com.simplypositive.pedmonitor.persistence.entity.ReportingYear;
import com.simplypositive.pedmonitor.persistence.repository.PedRepository;
import com.simplypositive.pedmonitor.persistence.repository.ReportingYearRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PedServiceImpl implements PedService {

  private final PedRepository pedRepo;
  private final ReportingYearRepository reportingYearRepo;

  private final ObjectMapper objectMapper;

  @Autowired
  public PedServiceImpl(
      PedRepository pedRepo, ReportingYearRepository reportingYearRepo, ObjectMapper objectMapper) {
    this.pedRepo = pedRepo;
    this.reportingYearRepo = reportingYearRepo;
    this.objectMapper = objectMapper;
  }

  @Override
  @Transactional
  public PositiveEnergyDistrict create(PedDefinition definition) {
    PositiveEnergyDistrict ped = pedRepo.save(definition.getPed());
    definition
        .getAnnualReports()
        .forEach(
            report -> {
              try {
                ReportingYear reportingYear = new ReportingYear();
                reportingYear.setPedId(ped.getId());
                reportingYear.setAssignedYear(report.getYear());
                reportingYear.setKpisJson(objectMapper.writeValueAsString(report.getKpis()));
                reportingYear.setEnergySourceFactorsJson(
                    objectMapper.writeValueAsString(report.getEnergySourceFactors()));
                reportingYear.setFetSourcesFactorsJson(
                    objectMapper.writeValueAsString(report.getFetDataSources()));

                reportingYearRepo.save(reportingYear);
              } catch (JsonProcessingException e) {
                throw new DataProcessingException("Failed to process PED reporting details", e);
              }
            });

    return ped;
  }

  @Override
  public PositiveEnergyDistrict updateName(Integer pedId, String newName)
      throws ResourceNotFoundException {
    PositiveEnergyDistrict ped =
        pedRepo.findById(pedId).orElseThrow(() -> new ResourceNotFoundException("PED", pedId));
    ped.setName(newName);
    return pedRepo.save(ped);
  }

  @Override
  public List<PositiveEnergyDistrict> getAll(SearchCriteria criteria) {
    if (criteria.getSorting() != null) {
      List<Sort.Order> orderList =
          criteria.getSorting().stream().map(this::toOrder).collect(Collectors.toList());
      pedRepo.findAll(Sort.by(orderList));
    }
    return pedRepo.findAll();
  }

  @Override
  public Optional<PositiveEnergyDistrict> getById(Integer pedId) {
    return pedRepo.findById(pedId);
  }

  private Sort.Order toOrder(Sorting sorting) {
    return Sort.Order.by(sorting.getField())
        .with(Sort.Direction.valueOf(sorting.getDirection().getValue()));
  }

  private Sort toSort(Sorting sorting) {
    return Sort.by(Sort.Direction.valueOf(sorting.getDirection().getValue()), sorting.getField());
  }
}
