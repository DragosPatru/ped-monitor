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
import Dropdown from "fragments/Dropdown";
import SimpleBackdrop from "fragments/Backdrop";

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useBasicState from "./useBasicState";
import IndicatorsForm from "./indicatorsForm"

import { countriesEU } from "constants/eu-countries"
import { commonInputPropsNotRequired } from "constants/component-properties"
import PedService from "services/PedService";
import HelpInputLabel from "./helpInputLabel";
import HelpInputLabelLarge from "./helpInputLabelLarge";

function DefinePed() {
    const [basicFormState, handleBasicInputChange] = useBasicState();
    const [selectedIndicators, setSelectedIndicators] = useState(new Set());
    const [selectedDataSources, setSelectedDataSources] = useState(new Set());
    const [selectedResDataSources, setSelectedResDataSources] = useState(new Set());
    // in case any of the RES data-sources is selected
    const defaultRESIndicator = "RESX";

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

    const handleResDataSourceSelection = (event) => {
        const { name, checked } = event.target;
        setSelectedResDataSources(prev => {
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
        // all fields must be valid before submitting
        const allValid = Object.values(basicFormState).every(field => field.isValid);
        const atLeastOneDs = selectedDataSources.size > 0;
        const atLeastOneIndicator = selectedIndicators.size > 0;
        const countryHasValue = basicFormState["country"].value.length > 0;

        if (!countryHasValue) {
            openValidationErrorSB("Please select a 'Country'!");
            return;
        }

        if (!allValid || !atLeastOneDs || !atLeastOneIndicator) {
            openValidationErrorSB("Please make sure all the required values are filled and at " +
                "least one indicator and data-source are selected !");
            return;
        }

        // show loading
        handleOpenBackdrop(true);

        const indicators = Array.from(selectedIndicators);
        if (selectedResDataSources.size > 0) {
            indicators.push(defaultRESIndicator);
        }

        const submissionData = {
            ...Object.keys(basicFormState).reduce((acc, key) => {
                const value = basicFormState[key].value;
                // Convert to number if possible, otherwise keep as original
                acc[key] = Number.isFinite(+value) ? +value : value;
                return acc;
            }, {}),
            indicators: indicators,
            fetDataSources: Array.from(selectedDataSources),
            resDataSources: Array.from(selectedResDataSources)
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
    const [validationErrorSB, setValidationErrorSB] = useState({ open: false, message: "" });
    const openValidationErrorSB = (message) => setValidationErrorSB({ open: true, message: message });
    const closeValidationErrorSB = () => setValidationErrorSB({ open: false, message: "" });
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

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <MDBox pt={6} pb={3}>
                <SimpleBackdrop open={backdropOpen} handleClose={handleCloseBackdrop} />
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
                                                    label={
                                                        <HelpInputLabel label={"Name *"} helpText={"name of the district or area for which a Positive Energy District (PED) would be implemented"} />
                                                    }
                                                    name="name"
                                                    value={basicFormState.name.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.name.isValid}
                                                    helperText={!basicFormState.name.isValid ? "Value required. No more than 250 characters" : ""}
                                                    {...commonInputPropsNotRequired}
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
                                                    // InputLabelProps={{ style: { pointerEvents: "auto" } }}
                                                    label={
                                                        <HelpInputLabel label={"Baseline Year *"} helpText={"baseline year for the calculation of progress for PED achievement"} />
                                                    }
                                                    name="baselineYear"
                                                    type="number"
                                                    value={basicFormState.baselineYear.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.baselineYear.isValid}
                                                    helperText={!basicFormState.baselineYear.isValid ? "Value required. Greater than 2000 and less than 'Target Year'" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabel label={"Target Year *"} helpText={"target year set up by the user to achieve PED status"} />
                                                    }
                                                    name="targetYear"
                                                    value={basicFormState.targetYear.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.targetYear.isValid}
                                                    helperText={!basicFormState.targetYear.isValid ? "Value required. Greater than 'Baseline Year'" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabel label={"Degree of energetic self-supply by RES in baseline year (%) *"} helpText={"percent of final energy consumption provided by renewable energy generated on-site in baseline year"} />
                                                    }
                                                    name="percentSelfSupplyRenewableEnergyInBaseline"
                                                    type="number"
                                                    value={basicFormState.percentSelfSupplyRenewableEnergyInBaseline.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.percentSelfSupplyRenewableEnergyInBaseline.isValid}
                                                    helperText={!basicFormState.percentSelfSupplyRenewableEnergyInBaseline.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>

                                            <Grid item xs={0} md={12} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>

                                            {/* Additional Fields */}
                                            {/* Total Area Size */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabel label={"Size of Focus District (m²) *"} helpText={"m² of district"} />
                                                    }
                                                    name="focusDistrictSize"
                                                    type="number"
                                                    value={basicFormState.focusDistrictSize.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.focusDistrictSize.isValid}
                                                    helperText={!basicFormState.focusDistrictSize.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            {/* Number of Citizens */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabel label={"Population of Focus District *"} helpText={"no. of citizens"} />
                                                    }
                                                    name="focusDistrictPopulation"
                                                    type="number"
                                                    value={basicFormState.focusDistrictPopulation.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.focusDistrictPopulation.isValid}
                                                    helperText={!basicFormState.focusDistrictPopulation.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            {/* Build Up Area Size */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabel label={"Build Up Area Size (sq. meters) *"} helpText={"m² of the focus district which has buildings"} />
                                                    }
                                                    name="buildUpAreaSize"
                                                    type="number"
                                                    value={basicFormState.buildUpAreaSize.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.buildUpAreaSize.isValid}
                                                    helperText={!basicFormState.buildUpAreaSize.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabel label={"Average Household Income (EUR) *"} helpText={"average household income EUR in the focus disctrict"} />
                                                    }
                                                    name="avgHouseholdIncome"
                                                    value={basicFormState.avgHouseholdIncome.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.avgHouseholdIncome.isValid}
                                                    helperText={!basicFormState.avgHouseholdIncome.isValid ? "Value required." : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>

                                            {/* <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'block' } }}></Grid> */}

                                            {/* Heating Degree Days */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabelLarge label={"Heating Degree Days *"} helpText={"Heating degree days (HDD) are a measurement used to quantify the demand for energy needed to heat a building. They represent the number of degrees that a day’s average temperature is below 65°F (18°C), which is the temperature below which buildings need to be heated. Free reference for calculation: https://www.degreedays.net/"} />
                                                    }
                                                    name="heatingDegreeDays"
                                                    type="number"
                                                    value={basicFormState.heatingDegreeDays.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.heatingDegreeDays.isValid}
                                                    helperText={!basicFormState.heatingDegreeDays.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            {/* Cooling Degree Days */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabelLarge label={"Cooling Degree Days *"} helpText={"Cooling Degree Days represent the cumulative difference between the average daily temperature and a reference temperature (usually 65°F or 18.3°C); this parameter is used to assess cooling energy requirements for buildings and manage energy consumption. Free reference for calculation: https://www.degreedays.net/"} />
                                                    }
                                                    name="coolingDegreeDays"
                                                    type="number"
                                                    value={basicFormState.coolingDegreeDays.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.coolingDegreeDays.isValid}
                                                    helperText={!basicFormState.coolingDegreeDays.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>

                                            {/* Placeholder */}
                                            <Grid item xs={0} md={12} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>

                                            {/* Dynamic indicators */}
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabelLarge label={"Primary Energy Factor *"}
                                                            helpText={"yearly primary energy factor may be the pre-selected default European average of"
                                                                + " 1.9 OR can be insert manually; according to Art. 13 of Directive (EU) 2023/1791 "
                                                                + "(available here: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ%3AJOL_2023_231_R_0001&qid=1695186598766 ),"
                                                                + " the default primary energy factor of 1.9 is to be used, unless there are other justified national circumstances. "
                                                                + "Primary conversion factors may be found in national Energy Plans and strategies, depending on each country profile."} />
                                                    }
                                                    name="primaryEnergyFactor"
                                                    type="number"
                                                    value={basicFormState.primaryEnergyFactor.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.primaryEnergyFactor.isValid}
                                                    helperText={!basicFormState.primaryEnergyFactor.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
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
                                                    label={
                                                        <HelpInputLabelLarge label={"Factor for electricity - value (t CO2-eq/MWh) *"} helpText={"Please insert yearly emission factors for grid electricity. Emission factors may be obtained:<br/><strong>(1) from electricity provider (suggested) and should be updated anually</strong> <br/>(2) from international databases such as IPPC." +
                                                            "<br/>IMPORTANT: all yearly conversion factors introduced in the tool must be from the same source (e.g. energy provider) for all the monitoring years." +
                                                            "<br/>Examples of open-source database: Joint Research Centre Data Catalogue <br/> -> please select the lates version of GHG Emission Factors for Electricity Consumption <br/>-> Table 3: CoM emission factors for national electricity for EU member states, Iceland and Norway: Life-cycle (LC) approach, GHG emissions in tonnes CO2-eq/MWh <br/>-> select the conversion factor closest to your baseline year <br/>-> yearly check the database for updates " +
                                                            "link: https://data.jrc.ec.europa.eu/collection/id-00172 "} />
                                                    }
                                                    name="ghgEmissionFactorElectricity"
                                                    type="number"
                                                    value={basicFormState.ghgEmissionFactorElectricity.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorElectricity.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorElectricity.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabelLarge label={"Factor for electricity - source *"} helpText={"source of yearly emission factor provided for electricity;<br/> IMPORTANT: all yearly emission factors introduced in the tool must be from the same source (e.g. energy provider) for all the monitoring years."} />
                                                    }
                                                    name="ghgEmissionFactorElectricitySource"
                                                    type="text"
                                                    value={basicFormState.ghgEmissionFactorElectricitySource.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorElectricitySource.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorElectricitySource.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabelLarge label={"Factor for heat/cold generated in the district (t CO2-eq/MWh) *"} helpText={"Please insert yearly emission factors for locally produced heat (or cold), if local powerplants are in place for the district. Emission factors may be obtained:<br/>(1) from generation facility, based on specific studies <br/>(2) from international databases such as IPPC." +
                                                            "<br/> IMPORTANT: all yearly emission factors introduced in the tool must be from the same source (e.g. IPPC) for all the monitoring years." +
                                                            "<br/> Examples of open-source database: Joint Research Centre Data Catalogue <br/>-> please select the lates version of GHG Emission Factors for Local Energy Use <br/>-> Table 1 & Table 2 <br/>-> select the conversion factor according to the source of energy used within your facility <br/>-> yearly check the database for updates" +
                                                            "<br/> link: https://data.jrc.ec.europa.eu/collection/id-00172"} />
                                                    }
                                                    name="ghgEmissionFactorForHeathColdGenerated"
                                                    type="number"
                                                    value={basicFormState.ghgEmissionFactorForHeathColdGenerated.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorForHeathColdGenerated.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorForHeathColdGenerated.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label={
                                                        <HelpInputLabelLarge label={"Factor for heat/cold generated in the district - source *"} helpText={"source of yearly emission factor provided for electricity;<br/>IMPORTANT: all yearly emission factors introduced in the tool must be from the same source (e.g. IPPC) for all the monitoring years."} />
                                                    }
                                                    name="ghgEmissionFactorForHeathColdGeneratedSource"
                                                    type="text"
                                                    value={basicFormState.ghgEmissionFactorForHeathColdGeneratedSource.value}
                                                    onChange={handleBasicInputChange}
                                                    error={!basicFormState.ghgEmissionFactorForHeathColdGeneratedSource.isValid}
                                                    helperText={!basicFormState.ghgEmissionFactorForHeathColdGeneratedSource.isValid ? "Value required" : ""}
                                                    {...commonInputPropsNotRequired}
                                                />
                                            </Grid>

                                            {/* Indicators */}
                                            <Grid item xs={12}>
                                                <IndicatorsForm handleIndicatorSelection={handleIndicatorSelection} handleFetDataSourceSelection={handleDataSourceSelection} handleResDataSourceSelection={handleResDataSourceSelection} />
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