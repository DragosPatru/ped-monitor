// DefinePed.js
import { useRef, useState, useEffect } from 'react';
import useFormState from './useFormState';
import useIndicators from './useIndicators';
import SustainabilityIndicators from './indicators'; // We'll create this component next
import DashboardLayout from "fragments/Layouts/DashboardLayout";
import DashboardNavbar from "fragments/Navbars/DashboardNavbar";
import MDSnackbar from "components/MDSnackbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import ValidatedInput from "fragments/ValidatedInput";

const DefinePed = () => {
    const form = useRef();

    const { formState, handleInputChange, isFormValid } = useFormState({
        name: { value: '', isValid: false },
        startDate: { value: '', isValid: false },
        endDate: { value: '', isValid: false }
    });

    const {
        indicators,
        addIndicator,
        updateIndicator,
        removeIndicator,
        areIndicatorsValid
    } = useIndicators();

    const notEmptyRegex = new RegExp('.+');

    const createPed = (e) => {
        e.preventDefault();
        if (isFormValid() && areIndicatorsValid()) {
            // Proceed with form submission
        } else {
            openValidationErrorSB();
        }
    };

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

    // Fetch dropdown items, assume this part remains unchanged
    // useEffect(() => { fetchMenuItems(); }, []);

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
                                            

                                            <Grid item xs={12}>
                                                <MDButton variant="outlined" color="success" onClick={() => addIndicator()}>
                                                    + Add Sustainability Indicator
                                                </MDButton>

                                                <SustainabilityIndicators
                                                    indicators={indicators}
                                                    updateIndicator={updateIndicator}
                                                    removeIndicator={removeIndicator}
                                                />

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
};

export default DefinePed;