import React, { useState } from 'react';
import { Checkbox, FormGroup, FormLabel, FormControl, FormControlLabel } from '@mui/material';
import CollapsableRow from 'fragments/CollapsableRow';
import indicatorsMap from 'constants/indicators-map';
import indicatorsTreeData from 'constants/indicators-tree';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function IndicatorTreeItem({ indicator }) {
    const hasChildren = indicator.children && indicator.children.length > 0;
    const indicatorKey = indicator.key + "";
    console.log("Key is:" + indicatorKey);
    const title = indicatorsMap.get(indicatorKey)?.title;
    const renderChildNode = (childKey) => {
        const childTitle = indicatorsMap.get(childKey).title;
        return (
            <FormControlLabel key={"checkbox_" + childKey}
                control={<Checkbox name={childKey} />}
                label={childTitle}
                sx={{
                    '& .MuiFormControlLabel-label': {
                        fontWeight: 'fontWeightMedium',
                        color: 'text.main'
                    }
                }}
            />
        );

    };

    return (


        <div>
            {hasChildren ? (
                <CollapsableRow
                    title={title}
                    // onClick={handleExpandClick}
                    rightMostText=""
                    description="">
                    <FormGroup key={"indicator_group_" + indicatorKey}>
                        {indicator.children.map(renderChildNode)}
                    </FormGroup>
                </CollapsableRow>) :
                (
                    <MDBox mt={2}>
                    <FormGroup key={"indicator_group_" + indicatorKey} >
                        <FormControlLabel key={indicatorKey}
                            control={<Checkbox name={indicatorsTreeData.key} />}
                            label={title}
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontWeight: 'fontWeightMedium',
                                    color: 'text.main'
                                }
                            }}
                        />
                    </FormGroup>
                    </MDBox>
                )
            }

        </div>

    );
}

export default function IndicatorsTreeView() {
    return (
        <MDBox
            bgColor="grey-100"
            borderRadius="lg"
            p={3}
            mb={0}
            mt={2}
        >

        <MDTypography variant="subtitle1" color="dark" fontWeight="bold" mb={2}>
        Sustainability Indicators
      </MDTypography>

            {/* <FormControl component="fieldset" variant="standard"> */}
                {indicatorsTreeData.map((item, index) => (
                    <IndicatorTreeItem key={"indicator_" + item.key} indicator={item} />
                ))}
            {/* </FormControl> */}
        </MDBox>
    );
}