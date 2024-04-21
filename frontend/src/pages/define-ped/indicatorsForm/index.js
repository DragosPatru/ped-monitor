import React from 'react';
import { Checkbox, FormGroup, FormControl, FormControlLabel } from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CollapsableRow from 'fragments/CollapsableRow';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";

import energyRelatedIndicators from './data';
import indicatorsMap from 'constants/indicators-map';
import dataSourceFactorsFET from 'constants/data-source-factors-fet';

const dataSourceFactorsListFET = Array.from(dataSourceFactorsFET).map(([key, value]) => {
    return { key, title: value }; // Transform into an array of objects
});

function IndicatorSection({ section, sectionKey, itemNamePrefix }) {
    const title = section.title;
    const renderChildNode = (childKey) => {
        const childTitle = indicatorsMap.get(childKey).title;
        return (
            <FormControlLabel key={itemNamePrefix + childKey}
                control={<Checkbox name={childKey} />}
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

    return (
        <CollapsableRow
            title={title}
            titleFontWeight="regular"
            rightMostText=""
            description="">
            <FormGroup key={sectionKey + "-section"} sx={{ paddingLeft: '1rem' }}>
                {section.items.map(renderChildNode)}
            </FormGroup>
        </CollapsableRow>
    );
}

function DataSourceFactorsFET({ itemNamePrefix }) {
    const renderChildNode = (item) => {
        return (
            <Grid item xs={6}>
                <FormControlLabel key={itemNamePrefix + item.key}
                    control={<Checkbox name={item.key} />}
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
                Data Sources
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

export default function IndicatorsForm() {
    return (
        <MDBox
            //bgColor="grey-100"
            borderRadius="lg"

            mb={0}
            mt={2}
        >
            <MDTypography variant="subtitle1" color="dark" fontWeight="bold" mb={2}>
                Relevant indicators for PED
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
                        <DataSourceFactorsFET itemNamePrefix="fet-source-" />
                    </MDBox>

                    <MDBox ml={2} mr={2} mt={4}>
                        <MDTypography variant="h5" fontWeight="bold" color="text">
                            Indicators &nbsp;
                            <Chip label="to be filled annualy" sx={{ fontWeight: 'regular' }} variant="outlined" size="small" />
                        </MDTypography>
                        <Divider></Divider>
                    </MDBox>

                    <MDBox ml={4} mr={4}>
                        {energyRelatedIndicators.sectionsFET.map((item, index) => (
                            <IndicatorSection key={"fet-group-" + index} section={item} sectionKey={"fet-group-" + index} itemNamePrefix={"fet-indicator-"} />
                        ))}

                        {energyRelatedIndicators.sectionsRES.map((item, index) => (
                            <IndicatorSection key={"res-group-" + index} section={item} sectionKey={"res-group-" + index} itemNamePrefix={"res-indicator-"} />
                        ))}
                    </MDBox>

                </FormControl>
            </CollapsableRow>
        </MDBox>
    );
}