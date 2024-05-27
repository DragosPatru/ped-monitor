import React from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CollapsableRow from 'fragments/CollapsableRow';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from "@mui/material/Grid";

import DetailsCard from "./detailsCard";
import Indicator from "./indicator";
import KpiChart from "./kpiChart";

import energyRelatedIndicators from 'constants/indicators-sections';
import indicatorsMap from 'constants/indicators-map';

const renderKpi = (kpiCode, kpis, showTitle, color, bgColor) => {
    let stats = null;
    if (kpis.hasOwnProperty(kpiCode)) {
        stats = kpis[kpiCode];
    }
    
    if (stats === null) {
        return null;
    }

    return (
        <Grid item xs={12} md={8} xl={6} key={kpiCode} mt={2}>
            <KpiChart code={kpiCode} values={stats} showTitle={showTitle} color={color} bgColor={bgColor} />
        </Grid>
    );
};

const renderKpis = (kpiCodes, kpis, showTitle, color) => {
    var shouldRenderKpis = false;
    const renderedKpis = kpiCodes.map(kpiCode => {
        const kpi = renderKpi(kpiCode, kpis, showTitle, color, "grey-100");
        if (kpi !== null) {
            shouldRenderKpis = shouldRenderKpis || true;
        }
        return kpi;
    });
    if (shouldRenderKpis == false) {
        return null;
    }

    return (
        <Grid container>
            {renderedKpis}
        </Grid>
    );
};



function IndicatorSection({ section, sectionKey, indicatorsStats, kpis }) {
    const title = section.title;
    const renderIndicator = (indicatorCode) => {
        let stats = null;
        if (indicatorsStats.hasOwnProperty(indicatorCode)) {
            stats = indicatorsStats[indicatorCode];
        }
        if (stats === null) {
            return null;
        }

        const indicator = stats.indicator;
        const title = indicatorsMap.get(indicatorCode).shortTitleInSubcategory;
        const displayOpts = stats.configured === false ?
            ({ color: "error", value: "Not Configured" }) :
            ({ color: "info", value: stats.progress + " %" });

        return (
            <Indicator key={indicator.code}
                color={displayOpts.color}
                icon="arrow_forward_ios"
                name={title}
                description=""
                value={displayOpts.value}
                route={"/sustainability-indicator/" + indicator.id}
            />
        );
    };

    const renderSubsection = (subsection) => {
        // render kpis
        const renderedKpis = renderKpis(subsection.kpis, kpis, true, "secondary")
        const kpisSection = renderedKpis && (
            <MDBox bgColor={"grey-100"}
                borderRadius="lg" p={1} pb={2} mt={2}>
                <Grid container mt={3} mb={-2}>
                    {renderedKpis}
                </Grid>
            </MDBox>);

        // render indicators
        var hasIndicators = false;
        const renderedIndicators = subsection.items.map(indicatorCode => {
            const indicator = renderIndicator(indicatorCode);
            if (indicator !== null) {
                hasIndicators = hasIndicators || true;
            }
            return indicator;
        });

        const indicatorsSection = hasIndicators && (<MDBox key={subsection.key + "-children"}
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none", width: { xs: "100%", md: "75%", lg: "60%" } }}
        >{renderedIndicators}</MDBox>);

        const content = kpisSection && indicatorsSection && (subsection.isContainer ? (
            <MDBox ml={2} mr={2} mt={2}>
                <MDTypography variant="h6" fontWeight="medium" color="text">
                    {subsection.title} &nbsp;
                </MDTypography>
                {kpisSection}
                <Divider></Divider>
                {indicatorsSection}
            </MDBox>) :
            (<MDBox ml={2} mr={2} mt={0}> <Divider></Divider>{indicatorsSection}</MDBox>));

        return (
            <MDBox key={subsection.key + "-subsection"}>{content}</MDBox>
        );
    };

    // daca sectiunea are KPIs atunci ar trebui prezentati
    return (
        <CollapsableRow
            title={title}
            titleFontWeight="regular"
            rightMostText=""
            description=""
            key={sectionKey + "-collapsable"}>
            <MDBox key={sectionKey + "-section"} sx={{ paddingLeft: '1rem' }} width="100%">

                <Grid container mt={2}>
                    {section.kpis.map(kpiCode => {
                        return renderKpi(kpiCode, kpis, true, "info")
                    })}
                </Grid>

                {section.hasSubsections ? (
                    section.subsections.map(renderSubsection)) : (
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0} sx={{ listStyle: "none" }} width="100%">
                        {section.items.map(renderIndicator)}
                    </MDBox>)}
            </MDBox>
        </CollapsableRow>
    );
}

export default function IndicatorsStats({ kpis, indicatorsStats }) {
    return (

        <Grid item xs={12} pl={2} pr={2}>
            <CollapsableRow
                title={energyRelatedIndicators.title}
                titleVariant="subtitle2"
                rightMostText=""
                description="">

                <MDBox ml={4} mr={4}>
                    <Grid container mt={2} mb={-2} ml={-2}>
                        {energyRelatedIndicators.kpis.map(kpiCode => {
                            return renderKpi(kpiCode, kpis, true, "success")
                        })}
                    </Grid>

                    {energyRelatedIndicators.sectionsFET.map((item, index) => (
                        <IndicatorSection key={"fet-group-" + index} section={item} sectionKey={"fet-group-" + index} itemNamePrefix={"indicator-"} indicatorsStats={indicatorsStats} kpis={kpis} />
                    ))}

                    {energyRelatedIndicators.sectionsRES.map((item, index) => (
                        <IndicatorSection key={"res-group-" + index} section={item} sectionKey={"res-group-" + index} itemNamePrefix={"indicator-"} indicatorsStats={indicatorsStats} kpis={kpis} />
                    ))}
                </MDBox>

            </CollapsableRow>
        </Grid>


    );
}