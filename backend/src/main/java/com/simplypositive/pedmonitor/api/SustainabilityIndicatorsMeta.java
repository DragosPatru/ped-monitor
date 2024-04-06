package com.simplypositive.pedmonitor.api;

import com.simplypositive.pedmonitor.persistence.entity.SustainabilityIndicatorType;
import com.simplypositive.pedmonitor.persistence.entity.Unit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SustainabilityIndicatorsMeta {

    private List<MetaInfo> data = new ArrayList<>();

    public void addMeta(SustainabilityIndicatorType type, Double targetValue, Unit unit) {
        MetaInfo info = new MetaInfo(type, targetValue, type.getDisplayName(), unit);
        data.add(info);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MetaInfo {

        private SustainabilityIndicatorType key;
        private Double targetValue;
        private String displayName;
        private Unit unit;
    }
}
