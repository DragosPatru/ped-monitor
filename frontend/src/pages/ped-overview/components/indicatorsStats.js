import React from 'react';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CollapsableRow from 'fragments/CollapsableRow';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";

import DetailsCard from "./detailsCard";
import Indicator from "./indicator";
import KpiChart from "./kpiChart";

import energyRelatedIndicators from 'constants/indicators-sections';
import indicatorsMap from 'constants/indicators-map';

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
        // render kpis - isContainer -> has KPIs

        // render other items
        const children = (<MDBox key={subsection.key + "-children"}
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
            width="60%"
        >{subsection.items.map(renderIndicator)}</MDBox>);

        const content = subsection.isContainer ? (
            <MDBox ml={2} mr={2} mt={2}>
                <MDTypography variant="h6" fontWeight="medium" color="text">
                    {subsection.title} &nbsp;
                </MDTypography>

                {/* render KPIs */}

                <Divider></Divider>
                {children}
            </MDBox>
        ) : (
            <MDBox ml={2} mr={2} mt={0}> <Divider></Divider>{children} </MDBox>);

        return (
            <MDBox key={subsection.key + "-subsection"}>
                {content}</MDBox>

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
                {section.hasSubsections ? (
                    section.subsections.map(renderSubsection)) : (

                    <MDBox
                        component="ul"
                        display="flex"
                        flexDirection="column"
                        p={0}
                        m={0}
                        sx={{ listStyle: "none" }}
                        width="100%"
                    >
                        {section.items.map(renderIndicator)}
                    </MDBox>)}
            </MDBox>
        </CollapsableRow>
    );
}

export default function IndicatorsStats({ kpis, indicatorsStats }) {
    return (
        <DetailsCard title="PED Indicators" description={"Demo description for this section"} shadow={true}>
            <Grid item xs={12} pl={2} pr={2}>
                <CollapsableRow
                    title={energyRelatedIndicators.title}
                    titleVariant="subtitle2"
                    rightMostText=""
                    description="">

                    {/* <Grid item xs={12} md={6} lg={4} pt={2}>
                        <MDBox mb={0}>
                            <KpiChart
                                code="FET0"
                                values={kpis["FET0"]}
                            />
                        </MDBox>
                    </Grid> */}

                    <MDBox ml={4} mr={4}>
                        {energyRelatedIndicators.sectionsFET.map((item, index) => (
                            <IndicatorSection key={"fet-group-" + index} section={item} sectionKey={"fet-group-" + index} itemNamePrefix={"indicator-"} indicatorsStats={indicatorsStats} kpis={kpis} />
                        ))}

                        {energyRelatedIndicators.sectionsRES.map((item, index) => (
                            <IndicatorSection key={"res-group-" + index} section={item} sectionKey={"res-group-" + index} itemNamePrefix={"indicator-"} indicatorsStats={indicatorsStats} kpis={kpis} />
                        ))}
                    </MDBox>

                </CollapsableRow>
            </Grid>

        </DetailsCard>
    );
}