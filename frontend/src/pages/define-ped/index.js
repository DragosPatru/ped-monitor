// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import DashboardLayout from "fragments/Layouts/DashboardLayout";
import DashboardNavbar from "fragments/Navbars/DashboardNavbar";

import { useRef, useState, useEffect } from 'react';

import useBasicState from "./useBasicState";
import IndicatorsForm from "./indicatorsForm"
import Dropdown from "fragments/Dropdown";

import { countriesEU } from "constants/eu-countries"

function DefinePed() {
    const [basicFormState, handleBasicInputChange] = useBasicState();

    const form = useRef();

    const handleCountrySelect = (item) => {
        handleBasicInputChange({
            target: {
                name: 'country',
                value: item.key,
            },
        });
    };

    const createPed = (e) => {
        e.preventDefault();
        e.preventDefault();
        // Check if all fields are valid before submitting
        const allValid = Object.values(basicFormState).every(field => field.isValid);
        if (!allValid) {
            console.error("Validation failed.");
            openValidationErrorSB();
            return;
        }

        // do the call
        console.log("Form submitted:", basicFormState);
    };


    // Validation toast message
    const [validationErrorSB, setValidationErrorSB] = useState(false);
    const openValidationErrorSB = () => setValidationErrorSB(true);
    const closeValidationErrorSB = () => setValidationErrorSB(false);
    const renderValidationErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Error"
            content="Could not retrieve data from the server !"
            dateTime="2 seconds ago"
            open={validationErrorSB}
            onClose={closeValidationErrorSB}
            close={closeValidationErrorSB}
            bgWhite
        />
    );

    const commonInputProps = {
        variant: "standard",
        InputLabelProps: { shrink: true, style: { fontSize: "1.2rem" } },
        inputProps: { style: { fontSize: "1.05rem" } },
        fullWidth: true,
        required: true,
    };

    const commonInputPropsNotRequired = {
        variant: "standard",
        InputLabelProps: { shrink: true, style: { fontSize: "1.2rem" } },
        inputProps: { style: { fontSize: "1.05rem" } },
        fullWidth: true,
        required: false,
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Create Positive Energy District
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={0}>
                                {/* FORM definition */}
                                <MDBox component="form" p={2} method="post" onSubmit={createPed} ref={form} >
                                    <MDBox px={3} py={{ xs: 2, sm: 6 }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Name"
                                                    name="name"
                                                    value={basicFormState.name.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.name.isValid}
                                                    helperText={!basicFormState.name.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Dropdown
                                                    name="country"
                                                    label="Select Country * ..."
                                                    items={countriesEU}
                                                    onMenuItemClick={handleCountrySelect}
                                                    valid={!basicFormState.country.isValid}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Baseline Year"
                                                    name="baselineYear"
                                                    type="number"
                                                    value={basicFormState.baselineYear.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.baselineYear.isValid}
                                                    helperText={!basicFormState.baselineYear.isValid ? "Value required. Greater than 2000" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Target Year"
                                                    name="targetYear"
                                                    value={basicFormState.targetYear.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.targetYear.isValid}
                                                    helperText={!basicFormState.targetYear.isValid ? "Value required. Greater than 2000" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <MDInput
                                                    label="Description"
                                                    name="description"
                                                    value={basicFormState.description.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.description.isValid}
                                                    helperText={!basicFormState.description.isValid ? "No more than 250 characters" : ""}
                                                    {...commonInputPropsNotRequired}
                                                    multiline
                                                    rows={3}
                                                />
                                            </Grid>


                                            {/* Additional Fields */}
                                            {/* Total Area Size */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Total Area Size (sq. meters)"
                                                    name="totalAreaSize"
                                                    type="number"
                                                    value={basicFormState.totalAreaSize.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.totalAreaSize.isValid}
                                                    helperText={!basicFormState.totalAreaSize.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            {/* Build Up Area Size */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Build Up Area Size (sq. meters)"
                                                    name="buildUpAreaSize"
                                                    type="number"
                                                    value={basicFormState.buildUpAreaSize.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.buildUpAreaSize.isValid}
                                                    helperText={!basicFormState.buildUpAreaSize.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            {/* Number of Citizens */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Number of Citizens"
                                                    name="numberOfCitizens"
                                                    type="number"
                                                    value={basicFormState.numberOfCitizens.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.numberOfCitizens.isValid}
                                                    helperText={!basicFormState.numberOfCitizens.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>

                                            {/* Heating Degree Days */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Heating Degree Days"
                                                    name="heatingDegreeDays"
                                                    type="number"
                                                    value={basicFormState.heatingDegreeDays.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.heatingDegreeDays.isValid}
                                                    helperText={!basicFormState.heatingDegreeDays.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            {/* Cooling Degree Days */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Cooling Degree Days"
                                                    name="coolingDegreeDays"
                                                    type="number"
                                                    value={basicFormState.coolingDegreeDays.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.coolingDegreeDays.isValid}
                                                    helperText={!basicFormState.coolingDegreeDays.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>


                                            {/* Indicators */}
                                            <Grid item xs={12}>


                                                <IndicatorsForm />

                                            </Grid>


                                            <Grid item xs={12} >
                                                <MDButton variant="gradient" color="info" type="submit">
                                                    Create
                                                </MDButton>
                                            </Grid>


                                        </Grid>

                                    </MDBox>
                                </MDBox>

                            </MDBox>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={8}>
                        <MDBox p={2}>
                            {renderValidationErrorSB}
                        </MDBox>
                    </Grid>
                </Grid>
            </MDBox>

        </DashboardLayout>
    );
}

export default DefinePed;