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

import ValidatedInput from "fragments/ValidatedInput";
import Dropdown from "fragments/Dropdown";

import SustainabilityIndicatorService from "services/SustainabilityIndicatorService"

import { useRef, useState, useEffect } from 'react';

function DefinePed() {
    const form = useRef();

    const createPed = (e) => {
        e.preventDefault();
        const pedValid = nameState.isValid && startDateState.isValid && endDateState.isValid;
        const allIndicatorsValid = indicators.every(indicator => indicator.isValid);
        if (pedValid && allIndicatorsValid) {
            //   emailjs.sendForm('wfMz-ctTy-s', 'yTJ-yp1-tm', form.current, 'wfMz-ctTy_yTJ-yp1')
            //     .then((result) => {
            //       setShowSuccess(true);
            //     }, (error) => {
            //       setShowError(true);
            //     });
        } else {
            openValidationErrorSB();
        }
    };

    const notEmptyRegex = new RegExp('.+');

    // Form fields
    // PED
    const [nameState, setNameState] = useState({ name: "", isValid: false });
    const onNameStateChange = (name, isValid) => {
        setNameState({ name: name, isValid: isValid });
    }

    const [startDateState, setStartDateState] = useState({ startDate: null, isValid: false });
    const onStartDateStateChange = (startDate, isValid) => setStartDateState({ startDate: startDate, isValid: isValid });

    const [endDateState, setEndDateState] = useState({ endDate: null, isValid: false });
    const onEndDateStateChange = (endDate, isValid) => setEndDateState({ endDate: endDate, isValid: isValid });

    // INDICATORS
    const [indicators, setIndicators] = useState([]);

    // Function to add a new indicator
    const addIndicator = () => {
        setIndicators(indicators => [...indicators, { name: '', type: '', unit: '', targetValue: 0, isValid: false }]);
    };

    const updateIndicator = (index, field, value) => {
        const updatedIndicators = indicators.map((indicator, i) => {
            if (i === index) {
                const updatedIndicator = { ...indicator, [field]: value };

                // Simple validation for demonstration: Ensure name is not empty
                if (field === 'name') {
                    updatedIndicator.isValid = value.trim() !== '';
                }

                return updatedIndicator;
            }
            return indicator;
        });

        setIndicators(updatedIndicators);
    };

    const removeIndicator = (index) => {
        // Filter out the indicator at the given index
        const updatedIndicators = indicators.filter((_, i) => i !== index);
        setIndicators(updatedIndicators);
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


    const [dropdownItems, setDropdownItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await SustainabilityIndicatorService.getIndicatorsMeta();
                setDropdownItems(response);
                
            } catch (error) {
                console.error('Failed to fetch menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleMenuItemClick = (item) => {
        console.log(`Clicked on menu item with action: ${item}`);
        // Handle the action
    };

    const commonInputProps = {
        variant: "standard",
        InputLabelProps: { shrink: true, style: { fontSize: "1.15rem" } },
        inputProps: { style: { fontSize: "1rem" } },
        fullWidth: true,
        required: true,
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
                                                <ValidatedInput name="name" label="Name" helperText="" validationRegex={notEmptyRegex} changeResultCallback={onNameStateChange} required />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <ValidatedInput name="startDate" label="Start Date" helperText="" type="date" validationRegex={notEmptyRegex} changeResultCallback={onStartDateStateChange} required />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <ValidatedInput name="endDate" label="End Date" helperText="" type="date" validationRegex={notEmptyRegex} changeResultCallback={onEndDateStateChange} required />
                                            </Grid>

                                            {/* Indicators */}
                                            <Grid item xs={12}>
                                                <MDButton variant="outlined" color="success" onClick={() => addIndicator()}>
                                                    + Add Sustainability Indicator
                                                </MDButton>

                                                {indicators.map((indicator, index) => (
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

                                                            <Grid item xs={12} md={6}>
                                                                <Dropdown
                                                                    label="Indicator Type ..."
                                                                    items={dropdownItems}
                                                                    onMenuItemClick={handleMenuItemClick}
                                                                />
                                                            </Grid>

                                                        </Grid>
                                                    </MDBox>
                                                ))}

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
                </Grid>
            </MDBox>

        </DashboardLayout>
    );
}

export default DefinePed;