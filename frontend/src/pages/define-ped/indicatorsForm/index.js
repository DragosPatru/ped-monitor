import React from 'react';
import { Checkbox, FormGroup, FormControl, FormControlLabel } from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CollapsableRow from 'fragments/CollapsableRow';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";

import HelpInputLabelLarge from "fragments/Labels/helpInputLabelLarge";

import energyRelatedIndicators from 'constants/indicators-sections';
import indicatorsMap from 'constants/indicators-map';
import dataSourceFactorsFET from 'constants/data-source-factors-fet';
import dataSourceFactorsRES from 'constants/data-source-factors-res';

const dataSourceFactorsListFET = Array.from(dataSourceFactorsFET).map(([key, value]) => {
    return { key, title: value }; // Transform into an array of objects
});

const dataSourcesRES = Array.from(dataSourceFactorsRES).map(([key, value]) => {
    return { key, title: value };
});

function IndicatorSection({ section, sectionKey, itemNamePrefix, onIndicatorChange }) {
    const title = section.title;
    const renderChildNode = (childKey) => {
        const childTitle = indicatorsMap.get(childKey).shortTitleInSubcategory;
        return (
            <FormControlLabel key={itemNamePrefix + childKey + "_label"}
                control={<Checkbox name={childKey} onChange={onIndicatorChange} />}
                label={childTitle}
                sx={{
                    '& .MuiFormControlLabel-label': {
                        fontWeight: 'fontWeightRegular',
                        color: 'text.main'
                    }
                }}
            />
        );
    };

    const renderSubsection = (subsection) => {
        const children = (<MDBox key={subsection.key + "-children"}>{subsection.items.map(renderChildNode)}</MDBox>);
        const content = subsection.isContainer ? (
            <MDBox ml={2} mr={2} mt={2}>
                <MDTypography variant="h6" fontWeight="medium" color="text">
                    {subsection.title} &nbsp;
                </MDTypography>
                <Divider></Divider>
                {children}
            </MDBox>
        ) : (
            <MDBox ml={2} mr={2} mt={0}> <Divider></Divider>{children} <Divider></Divider></MDBox>);

        return (
            <MDBox key={subsection.key + "-subsection"}>{content}</MDBox>

        );
    };


    return (
        <CollapsableRow
            title={title}
            titleFontWeight="regular"
            rightMostText=""
            description=""
            key={sectionKey + "-collapsable"}>
            <FormGroup key={sectionKey + "-section"} sx={{ paddingLeft: '1rem' }}>
                {section.hasSubsections ? (
                    section.subsections.map(renderSubsection)) : (section.items.map(renderChildNode))}
            </FormGroup>
        </CollapsableRow>
    );
}

function DataSourceFactorsFET({ itemNamePrefix, onDataSourceChange }) {
    const renderChildNode = (item) => {
        return (
            <Grid item xs={12} md={6} key={"ds-grid-" + item.key}>
                <FormControlLabel key={itemNamePrefix + item.key}
                    control={<Checkbox name={item.key} onChange={onDataSourceChange} />}
                    label={item.title}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontWeight: 'fontWeightRegular',
                            color: 'text.main'
                        }
                    }}
                />
            </Grid>
        );
    };

    return (
        <MDBox>
            <MDTypography variant="h5" fontWeight="bold" color="text">
                <HelpInputLabelLarge warning={true} label="Energy Sources " helpText={"please select the types of energy sources applicable in your district"
                    + "<br/>IMPORTANT: (1) if you have Electricity provided by a grid supplier please select <strong>'Electricity'</strong>"
                    + "<br/>(2) if you have local generation of heat/cold, please select <strong>'Locally produced Heat/cold'</strong>"
                    + "<br/><strong>(3) IMPORTANT: if you do not select in this stage ALL energy sources which are applicable to your district, data cannot be inserted in the later stage</strong>"}></HelpInputLabelLarge>

            </MDTypography>
            <Divider />
            <FormGroup key="fet-source-section" sx={{ paddingLeft: '1rem' }}>
                <Grid container>
                    {dataSourceFactorsListFET.map(renderChildNode)}
                </Grid>
            </FormGroup>
        </MDBox>

    );
}

function DataSourcesRES({ itemNamePrefix, onDataSourceChange }) {
    const renderChildNode = (item) => {
        return (
            <FormControlLabel key={itemNamePrefix + item.key}
                control={<Checkbox name={item.key} onChange={onDataSourceChange} />}
                label={"Local electricity production:" + item.title}
                sx={{
                    '& .MuiFormControlLabel-label': {
                        fontWeight: 'fontWeightRegular',
                        color: 'text.main'
                    }
                }}
            />
        );
    };

    return (
        <CollapsableRow
            title="Locally produced renewable energy"
            titleFontWeight="regular"
            rightMostText=""
            description=""
            key="res-source-section-collapsable" >
            <FormGroup sx={{ paddingLeft: '1rem' }}>
                {dataSourcesRES.map(renderChildNode)}
            </FormGroup>
        </CollapsableRow>
    );
}

export default function IndicatorsForm({ handleIndicatorSelection, handleFetDataSourceSelection, handleResDataSourceSelection }) {
    return (
        <MDBox
            //bgColor="grey-100"
            borderRadius="lg"

            mb={0}
            mt={2}
        >
            <MDTypography variant="subtitle1" color="dark" fontWeight="bold" mb={2}>
                <HelpInputLabelLarge warning={true} label="Relevant indicators for PED " helpText={"please select ALL energy sources and types of energy sectors which apply to your PED."
                    + "</br><strong>IMPORTANT: if you do not select in this stage ALL applicable data for your district, data cannot be inserted in the later stage</strong>"} />
            </MDTypography>

            <CollapsableRow
                title={energyRelatedIndicators.title}
                // onClick={handleExpandClick}
                titleVariant="subtitle2"
                rightMostText=""
                description="">

                <FormControl component="fieldset" variant="outlined"
                    sx={{ width: "100%" }}>
                    <MDBox ml={2} mr={2}>
                        <DataSourceFactorsFET itemNamePrefix="data-source-" onDataSourceChange={handleFetDataSourceSelection} />
                    </MDBox>

                    <MDBox ml={2} mr={2} mt={4}>
                        <MDTypography variant="h5" fontWeight="bold" color="text">
                            <HelpInputLabelLarge warning={true} label="Energy Sectors " helpText={"please select the sectors of energy consumptions / renewable energy production you would like to monitor as part of your system boundaries; categories are defined according to Covenant of Mayors methodology"
                                + "<br/>IMPORTANT: (1) select as many categories as possible in order to have an accurate PED progress"
                                + "<br/>(2) energy consumptions/generation must be monitored according to these categories"
                                + "<br/><strong>(3) IMPORTANT: if you do not select in this stage ALL categories which are applicable to your district, data cannot be inserted in the later stage</strong>"}>
                            </HelpInputLabelLarge>
                        </MDTypography>
                        <Divider></Divider>
                    </MDBox>

                    <MDBox ml={4} mr={4}>
                        {energyRelatedIndicators.sectionsFET.map((item, index) => (
                            <IndicatorSection key={"fet-group-" + index} section={item} sectionKey={"fet-group-" + index} itemNamePrefix={"indicator-"} onIndicatorChange={handleIndicatorSelection} />
                        ))}

                        {/* {energyRelatedIndicators.sectionsRES.map((item, index) => (
                            <IndicatorSection key={"res-group-" + index} section={item} sectionKey={"res-group-" + index} itemNamePrefix={"indicator-"} onIndicatorChange={handleIndicatorSelection} />
                        ))} */}

                        <DataSourcesRES itemNamePrefix="data-source-res-" onDataSourceChange={handleResDataSourceSelection} />

                    </MDBox>

                </FormControl>
            </CollapsableRow>
        </MDBox>
    );
}