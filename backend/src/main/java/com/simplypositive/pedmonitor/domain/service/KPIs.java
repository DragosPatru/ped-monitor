package com.simplypositive.pedmonitor.domain.service;

import com.simplypositive.pedmonitor.AppConfigurationProperties;
import com.simplypositive.pedmonitor.AppConfigurationProperties.IndicatorMeta;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KPIs {

  private final AppConfigurationProperties props;

  @Autowired
  public KPIs(AppConfigurationProperties props) {
    this.props = props;
  }

  public Set<String> kpisForIndicator(String indicator) {
    Set<String> kpis = new HashSet<>();
    IndicatorMeta indicatorMeta = props.getMetaData(indicator);
    if (indicatorMeta != null) {
      if (indicatorMeta.hasParent()) {
        kpis.add(indicatorMeta.getParent());
        kpis.addAll(kpisForIndicator(indicatorMeta.getParent()));
      } else {
        kpis.add(indicator);
      }
    }
    return kpis;
  }
}
