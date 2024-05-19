package com.simplypositive.pedmonitor.domain.service;

import static com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta.FET_PREFIX;
import static com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta.RES_PREFIX;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import com.simplypositive.pedmonitor.domain.model.KPI;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KPIs {

  public static final String SS = "SS";
  public static final String GHG = "FET0_GHG_";
  public static final String OVERALL_RES = "OVERALL_RES";
  public static final String OVERALL_GHG = "OVERALL_GHG";
  public static final String OVERALL_GHG_RES = "OVERALL_GHG_RES";
  private final AppConfigurationProperties props;

  @Autowired
  public KPIs(AppConfigurationProperties props) {
    this.props = props;
  }

  public Set<String> childrenOf(KPI kpi) {
    Set<String> result = new HashSet<>();
    var indicators = props.getIndicators();
    for (var code : indicators.keySet()) {
      if (indicators.get(code).getParent().equals(kpi.baseCode())) {
        if (kpi.isGreenHouseEmissions()) {
          result.add(indicators.get(code).getGreenHouseGasEmissionKPI());

        } else {
          result.add(code);
        }
      }
    }
    return result;
  }

  public Set<String> kpisForIndicator(String indicator) {
    Set<String> kpis = new HashSet<>();
    IndicatorMeta indicatorMeta = props.getMetaData(indicator);
    if (indicatorMeta != null) {
      if (indicatorMeta.isKpi()) {
        kpis.add(indicator);
        if (indicatorMeta.hasGreenHouseEmissionKPI()) {
          kpis.add(indicatorMeta.getGreenHouseGasEmissionKPI());
        }
        if (indicatorMeta.hasOverallKPIs()) {
          kpis.addAll(indicatorMeta.getOverallKPIS());
        }
      }
      if (indicatorMeta.hasParent()) {
        kpis.addAll(kpisForIndicator(indicatorMeta.getParent()));
      }
    }
    return kpis;
  }

  public Set<String> overallKPIs(Set<String> kpis) {
    Set<String> overallKpis = new HashSet<>();
    // at least one FET & one RES then SS
    var oneFet = false;
    var oneRes = false;
    for (var kpi : kpis) {
      if (!oneFet && kpi.startsWith(FET_PREFIX)) {
        oneFet = true;
      } else if (!oneRes && kpi.startsWith(RES_PREFIX)) oneRes = true;
    }

    var ss = oneFet && oneRes;
    var overallRES = ss;
    var overallGHG = oneFet;
    var overallGHG_RES = overallRES && overallGHG;

    if (ss) {
      overallKpis.add(SS);
    }

    if (overallRES) {
      overallKpis.add(OVERALL_RES);
    }

    if (overallGHG) {
      overallKpis.add(OVERALL_GHG);
    }

    if (overallGHG_RES) {
      overallKpis.add(OVERALL_GHG_RES);
    }

    return overallKpis;
  }
}
