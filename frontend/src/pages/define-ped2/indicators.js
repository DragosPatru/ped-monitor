import React from 'react';
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import Dropdown from "fragments/Dropdown";
// components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


const SustainabilityIndicators = ({ indicators, updateIndicator, removeIndicator }) => {

    const commonInputProps = {
        variant: "standard",
        InputLabelProps: { shrink: true, style: { fontSize: "1.15rem" } },
        inputProps: { style: { fontSize: "1rem" } },
        fullWidth: true,
        required: true,
    };

  return indicators.map((indicator, index) => (    
        <MDBox
            bgColor="grey-100"
            borderRadius="lg"
            p={3}
            mb={0}
            mt={2}
        >
            <Grid container spacing={2} key={index} >
                <Grid item xs={12}>
                    <MDBox display="flex"
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        flexDirection={{ xs: "column", sm: "row" }}
                        mb={2}>
                        <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
                            Sustainability Indicator {index}
                        </MDTypography>
                        <MDBox>
                            <MDButton variant="text" color="error" onClick={() => removeIndicator(index)}>
                                <Icon>delete</Icon>&nbsp;Remove
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </Grid>
    
                <Grid item xs={12} md={6}>
                    <MDInput
                        label="Type"
                        value={indicator.type}
                        onChange={(e) => updateIndicator(index, 'type', e.target.value)}
                        error={!indicator.isValid}
                        helperText={!indicator.isValid && "Value cannot be empty"}
                        {...commonInputProps}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MDInput
                        label="Name"
                        value={indicator.name}
                        onChange={(e) => updateIndicator(index, 'name', e.target.value)}
                        error={!indicator.isValid}
                        helperText={!indicator.isValid && "Value cannot be empty"}
                        {...commonInputProps}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MDInput label="Target Value" type="number"
                        value={indicator.targetValue}
                        onChange={(e) => updateIndicator(index, 'targetValue', e.target.value)}
                        error={!indicator.isValid}
                        helperText={!indicator.isValid && "Value cannot be empty"}
                        {...commonInputProps}
                    />
                </Grid>
    
                {/* <Grid item xs={12} md={6}>
                    <Dropdown
                        label="Indicator Type ..."
                        items={dropdownItems}
                        onMenuItemClick={handleMenuItemClick}
                    />
                </Grid> */}
    
            </Grid>
        </MDBox>
    
  ));
};

export default SustainabilityIndicators;