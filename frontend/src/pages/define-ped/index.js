// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";

import DashboardLayout from "fragments/Layouts/DashboardLayout";
import DashboardNavbar from "fragments/Navbars/DashboardNavbar";

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SimpleBackdrop from "fragments/Backdrop";

import useBasicState from "./useBasicState";
import IndicatorsForm from "./indicatorsForm"
import Dropdown from "fragments/Dropdown";

import { countriesEU } from "constants/eu-countries"
import PedService from "services/PedService";

function DefinePed() {
    const [basicFormState, handleBasicInputChange] = useBasicState();
    const [selectedIndicators, setSelectedIndicators] = useState(new Set());
    const [selectedDataSources, setSelectedDataSources] = useState(new Set());

    const form = useRef();

    const navigate = useNavigate();

    const handleIndicatorSelection = (event) => {
        const { name, checked } = event.target;
        setSelectedIndicators(prev => {
            const newSet = new Set(prev); // Create a new set in order for react to recognize that it's a new obj
            if (checked) {
                newSet.add(name);
            } else {
                newSet.delete(name);
            }
            return newSet;
        });
    };

    const handleDataSourceSelection = (event) => {
        const { name, checked } = event.target;
        setSelectedDataSources(prev => {
            const newSet = new Set(prev);
            if (checked) {
                newSet.add(name);
            } else {
                newSet.delete(name);
            }
            return newSet;
        });
    };

    const handleCountrySelect = (item) => {
        handleBasicInputChange({
            target: {
                name: 'country',
                value: item.key,
            },
        });
    };

    const createPed = async (e) => {
        e.preventDefault();
        handleOpenBackdrop(true);

        // Check if all fields are valid before submitting
        const allValid = Object.values(basicFormState).every(field => field.isValid);
        if (!allValid) {
            console.error("Validation failed.");
            openValidationErrorSB("Please make sure all the required values are filled and at least one indicator and data-source are selected !");
            return;
        
        }

        const submissionData = {
            ...Object.keys(basicFormState).reduce((acc, key) => {
                const value = basicFormState[key].value;
                // Convert to number if possible, otherwise keep as original
                acc[key] = Number.isFinite(+value) ? +value : value;
                return acc;
            }, {}),
            indicators: Array.from(selectedIndicators),
            fetDataSources: Array.from(selectedDataSources)
        };

        try {
            const result = await PedService.create(submissionData);
            return navigate("/peds");

        } catch (error) {
            openValidationErrorSB("Failed to create the PED!");

        } finally {
            handleCloseBackdrop(false);
        }
    };


    // Validation toast message
    const [validationErrorSB, setValidationErrorSB] = useState({open: false, message: ""});
    const openValidationErrorSB = (message) => setValidationErrorSB({open: true, message: message});
    const closeValidationErrorSB = () => setValidationErrorSB({open: false, message: ""});
    const renderValidationErrorSB = (
        <MDSnackbar
            color="error"
            icon="warning"
            title="Error"
            content={validationErrorSB.message}
            dateTime="1 second ago"
            open={validationErrorSB.open}
            onClose={closeValidationErrorSB}
            close={closeValidationErrorSB}
            bgWhite
        />
    );

    const [backdropOpen, setBackdropOpen] = useState(false);
    const handleOpenBackdrop = () => {
      setBackdropOpen(true);
    };
    const handleCloseBackdrop = () => {
      setBackdropOpen(false);
    };
  
    
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
            <SimpleBackdrop open={backdropOpen} handleClose={handleCloseBackdrop}/>
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
                                                    helperText={!basicFormState.name.isValid ? "Value required. No more than 250 characters" : ""}
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
                                                    helperText={!basicFormState.baselineYear.isValid ? "Value required. Greater than 2000 and less than 'Target Year'" : ""}
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
                                                    helperText={!basicFormState.targetYear.isValid ? "Value required. Greater than 'Baseline Year'" : ""}
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

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Degree of energetic self-supply by RES in baseline year (%)"
                                                    name="percentSelfSupplyRenewableEnergyInBaseline"
                                                    type="number"
                                                    value={basicFormState.percentSelfSupplyRenewableEnergyInBaseline.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.percentSelfSupplyRenewableEnergyInBaseline.isValid}
                                                    helperText={!basicFormState.percentSelfSupplyRenewableEnergyInBaseline.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="GHG emissions in baseline year (tCO2eq/a)"
                                                    name="ghgEmissionsTotalInBaseline"
                                                    type="number"
                                                    value={basicFormState.ghgEmissionsTotalInBaseline.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionsTotalInBaseline.isValid}
                                                    helperText={!basicFormState.ghgEmissionsTotalInBaseline.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            {/* Additional Fields */}
                                            {/* Total Area Size */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Size of Focus District (sq. meters)"
                                                    name="focusDistrictSize"
                                                    type="number"
                                                    value={basicFormState.focusDistrictSize.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.focusDistrictSize.isValid}
                                                    helperText={!basicFormState.focusDistrictSize.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            {/* Number of Citizens */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Population of Focus District"
                                                    name="focusDistrictPopulation"
                                                    type="number"
                                                    value={basicFormState.focusDistrictPopulation.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.focusDistrictPopulation.isValid}
                                                    helperText={!basicFormState.focusDistrictPopulation.isValid ? "Value required" : ""}
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

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Average Household Income (EUR)"
                                                    name="avgHouseholdIncome"
                                                    value={basicFormState.avgHouseholdIncome.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.avgHouseholdIncome.isValid}
                                                    helperText={!basicFormState.avgHouseholdIncome.isValid ? "Value required." : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            {/* <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'block' } }}></Grid> */}

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

                                            {/* Placeholder */}
                                            <Grid item xs={0} md={12} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>

                                            {/* Dynamic indicators */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Primary Energy Factor"
                                                    name="primaryEnergyFactor"
                                                    type="number"
                                                    value={basicFormState.primaryEnergyFactor.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.primaryEnergyFactor.isValid}
                                                    helperText={!basicFormState.primaryEnergyFactor.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            <Grid item xs={0} md={12} >
                                                <MDBox borderRadius="lg" mb={0} mt={1}>
                                                    <MDTypography variant="subtitle2" color="dark" fontWeight="bold" mb={2}>
                                                        GHG emission(s)
                                                    </MDTypography>
                                                </MDBox>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Factor for electricity (t CO2-eq/MWh)"
                                                    name="ghgEmissionFactorElectricity"
                                                    type="number"
                                                    value={basicFormState.ghgEmissionFactorElectricity.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorElectricity.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorElectricity.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Factor for electricity - source"
                                                    name="ghgEmissionFactorElectricitySourceCode"
                                                    type="text"
                                                    value={basicFormState.ghgEmissionFactorElectricitySourceCode.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorElectricitySourceCode.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorElectricitySourceCode.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Factor for heat/cold generated in the district (t CO2-eq/MWh)"
                                                    name="ghgEmissionFactorForHeathColdGenerated"
                                                    type="number"
                                                    value={basicFormState.ghgEmissionFactorForHeathColdGenerated.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorForHeathColdGenerated.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorForHeathColdGenerated.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Factor for heat/cold generated in the district - source"
                                                    name="ghgEmissionFactorForHeathColdGeneratedSourceCode"
                                                    type="text"
                                                    value={basicFormState.ghgEmissionFactorForHeathColdGeneratedSourceCode.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorForHeathColdGeneratedSourceCode.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorForHeathColdGeneratedSourceCode.isValid ? "Value required" : ""}
                                                    {...commonInputProps}
                                                />
                                            </Grid>

                                            {/* Indicators */}
                                            <Grid item xs={12}>
                                                <IndicatorsForm handleIndicatorSelection={handleIndicatorSelection} handleDataSourceSelection={handleDataSourceSelection} />
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