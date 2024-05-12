import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import Dropdown from "fragments/Dropdown";
import IndicatorService from "services/IndicatorService";
import { commonInputProps } from "constants/component-properties"

import dataSourceFactorsFET from "constants/data-source-factors-fet";

function ValueCreateModal({ indicatorId, dataSourceCodes, isOpen, onClose }) {
    const [basicFormState, handleBasicInputChange, resetFormState] = useEditableState(indicatorId);
    const dataSources = createDataSources(dataSourceCodes);

    // Effect to reset form state when modal opens
    useEffect(() => {
        if (isOpen) {
            resetFormState();
        }
    }, [isOpen]);

    const closeMe = (triggerReload = false) => {
        closeMessageAlert();
        onClose(triggerReload);
    }

    const saveData = async (e) => {
        e.preventDefault();

        closeMessageAlert();
        const allValid = Object.values(basicFormState).every(field => field.isValid);
        if (!allValid) {
            openValidationAlert();
            return;
        }

        const submissionData = {
            ...Object.keys(basicFormState).reduce((acc, key) => {
                const value = basicFormState[key].value;
                // Convert to number if possible, otherwise keep as original
                acc[key] = Number.isFinite(+value) ? +value : value;
                return acc;
            }, {}),
        };

        console.log("Sending data ...");
        console.log(submissionData);
        try {
            openInfoAlert();
            const result = await IndicatorService.createValue(indicatorId, submissionData);
            closeMe(true);

        } catch (error) {
            console.log(error);
            openErrorAlert();
        }
    }

    const handleDataSourceSelect = (item) => {
        handleBasicInputChange({
            target: {
                name: 'dataSourceCode',
                value: item.key,
            },
        });
    };

    // Alert message
    const [messageAlert, setMessageAlert] = useState({ open: true, message: "", color: "dark" });
    const openErrorAlert = () => setMessageAlert({ open: true, message: "Something went wrong! Couldn't save data.", color: "error" });
    const openValidationAlert = () => setMessageAlert({ open: true, message: "Invalid data! Please check the fields.", color: "error" });
    const openInfoAlert = () => setMessageAlert({ open: true, message: "Adding data...", color: "dark" });
    const closeMessageAlert = () => {
        setMessageAlert({ open: false, message: "", color: "dark" })
    };
    const renderTextAlert = (
        <Fade in={messageAlert.open} timeout={300}>
            <MDTypography variant="body2" color={messageAlert.color}>
                {messageAlert.message}
            </MDTypography>
        </Fade>
    );

    return (
        <Modal open={isOpen} onClose={closeMe} sx={{ display: "grid", placeItems: "center" }}>
            <Slide direction="down" in={isOpen} timeout={500}>
                <MDBox
                    position="relative"
                    width="50%"
                    maxHeight="80%"
                    overflow="auto"
                    display="flex"
                    flexDirection="column"
                    borderRadius="xl"
                    bgColor="white"
                    shadow="xl"
                >
                    <MDBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                        <MDTypography variant="h5">Add data</MDTypography>
                        <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeMe} />
                    </MDBox>
                    <Divider sx={{ my: 0 }} />
                    <MDBox pl={6} pr={6} pt={2} pb={2}>
                        <Grid container>
                            <Grid item xs={12} lg={5.8} mt={1}>
                                <MDInput
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    value={basicFormState.amount.value}
                                    onChange={handleBasicInputChange}
                                    error={!basicFormState.amount.isValid}
                                    helperText={!basicFormState.amount.isValid ? "Invalid amount" : ""}
                                    {...commonInputProps}
                                />
                            </Grid>
                            <Grid item xs={false} lg={0.4}>
                                <></>
                            </Grid>
                            <Grid item xs={12} lg={5.8} mt={1}>
                                <Dropdown
                                    name="dataSourceCode"
                                    label="Data source ..."
                                    items={dataSources}
                                    onMenuItemClick={handleDataSourceSelect}
                                    valid={basicFormState.dataSourceCode.isValid}
                                    needValidation={true}
                                />
                            </Grid>

                            <Grid item xs={12} mt={1}>
                                {renderTextAlert}
                            </Grid>
                        </Grid>
                    </MDBox>
                    <Divider sx={{ my: 0 }} />

                    <MDBox display="flex" justifyContent="space-between" p={3}>
                        <MDButton variant="gradient" color="dark" onClick={closeMe}>
                            close
                        </MDButton>
                        <MDButton variant="gradient" color="info" onClick={saveData}>
                            save changes
                        </MDButton>
                    </MDBox>
                </MDBox>
            </Slide>
        </Modal>
    );
}

// Setting default props for the ProfileInfoCard
ValueCreateModal.defaultProps = {
    isOpen: false,
};

const useEditableState = (indicatorId) => {
    const initialState = {
        indicatorId: { value: indicatorId, isValid: true },
        amount: { value: '', isValid: false },
        dataSourceCode: { value: '', isValid: false }
    };
    const [formState, setFormState] = useState(initialState);

    // Generalized input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let isValid = true;
        let isEmpty = value.trim() === '' ? true : false;

        isValid = !isEmpty;

        if (name === 'amount') {
            isValid = !isNaN(value) && (Number(value)) > 0;
        }

        setFormState(prevState => ({
            ...prevState,
            [name]: { value, isValid },
        }));
    };

    const resetFormState = () => {
        setFormState(initialState);
    };

    return [formState, handleInputChange, resetFormState];
};

function createDataSources(dataSourceCodes) {
    const dataSources = dataSourceCodes.map(code => {
        const title = dataSourceFactorsFET.get(code) || code;
        return { key: code, title: title };
    });

    return dataSources;
}

export default ValueCreateModal;