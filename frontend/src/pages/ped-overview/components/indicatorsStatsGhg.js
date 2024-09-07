import React from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CollapsableRow from 'fragments/CollapsableRow';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";

import KpiChart from "./kpiChart";
import KpiTable from './kpiTable';

import energyRelatedIndicators from 'constants/indicators-sections';
import indicatorsMap from 'constants/indicators-map';

const renderKpi = (kpiCode, kpis, showTitle, color) => {
    let stats = null;
    let unit = null;
    if (kpis.hasOwnProperty(kpiCode)) {
        stats = kpis[kpiCode];
        unit = indicatorsMap.get(kpiCode).unit
    }
    if (stats === null) {
        return null;
    }

    return (
        <Grid container key={kpiCode + "_container"} mb={1}>
            <Grid item xs={12} md={8} xl={6} key={kpiCode} mt={1}>
                <KpiChart code={kpiCode} values={stats} showTitle={showTitle} color={color} />
            </Grid>
            <Grid item xs={12} md={4} xl={4} key={kpiCode + "_table"} mb={2} ml={2} mt={-1} sx={{ maxHeight: '14rem' }}>
                <KpiTable values={stats} unit={unit} />
            </Grid>
        </Grid>
    );
};

const renderKpis = (kpiCodes, kpis, showTitle, color) => {
    var shouldRenderKpis = false;
    const renderedKpis = kpiCodes.map(kpiCode => {
        const kpi = renderKpi(kpiCode, kpis, showTitle, color);
        if (kpi !== null) {
            shouldRenderKpis = shouldRenderKpis || true;
        }
        return kpi;
    });

    if (shouldRenderKpis === false) {
        return null;
    }

    return (
        <Grid container mt={3} mb={-2}>
            {renderedKpis}
        </Grid>
    );
};

function KpiSection({ section, sectionKey, kpis }) {
    const title = section.title;

    const renderSubsection = (subsection) => {
        const renderedKpis = renderKpis(subsection.kpisGhg, kpis, false, "secondary");
        const children = (<MDBox key={subsection.key + "-children"}
            component="ul" display="flex" flexDirection="column" p={0}
            m={0} sx={{ listStyle: "none" }} width="100%">
            {renderedKpis}
        </MDBox>);

        const content = renderedKpis && (subsection.isContainer ? (
            <MDBox ml={2} mr={2} mt={2}>
                <MDTypography variant="h6" fontWeight="medium" color="text">
                    {subsection.title} &nbsp;
                </MDTypography>
                <Divider></Divider>
                {children}
            </MDBox>) : (<MDBox></MDBox>));
        return (
            <MDBox key={subsection.key + "-subsection"}>{content}</MDBox>
        );
    };

    return (
        <CollapsableRow title={title} rightMostText="" description="" key={sectionKey + "-collapsable"}>
            <MDBox key={sectionKey + "-section"} sx={{ paddingLeft: '1rem' }} width="100%">
                <Grid container mt={2} mb={-1}>
                    {section.kpisGhg.map(kpiCode => {
                        return renderKpi(kpiCode, kpis, true, "info")
                    })}
                </Grid>

                {section.hasSubsections ? (
                    section.subsections.map(renderSubsection)) : (
                    <MDBox>
                    </MDBox>)}
            </MDBox>
        </CollapsableRow>
    );
}

export default function IndicatorsStatsGhg({ kpis }) {
    return (
        <Grid item xs={12} pl={2} pr={2}>
            <CollapsableRow
                title="Greenhouse Gas Emissions"
                titleVariant="subtitle2"
                rightMostText=""
                description="">

                <MDBox ml={4} mr={4}>
                    <Grid container mt={2} mb={-2} ml={-2}>
                        {energyRelatedIndicators.kpisGhg.map(kpiCode => {
                            return renderKpi(kpiCode, kpis, true, "info")
                        })}
                    </Grid>

                    {energyRelatedIndicators.sectionsFET.map((item, index) => (
                        <KpiSection key={"fet-group-ghg" + index} section={item} sectionKey={"fet-group-ghg" + index} kpis={kpis} />
                    ))}
                </MDBox>

            </CollapsableRow>
        </Grid>
    );
}