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
import { commonInputProps, commonInputPropsNotRequired } from "constants/component-properties"

const energyUnits = [
    { key: "MWh_EURO", title: "MWh/EURO" },
    { key: "MWh", title: "MWh" }
];

function getEnergyUnitByKey(key) {
    return energyUnits.find(e => e.key === key);
}

function TaskEditModal({ task, isOpen, onClose }) {
    const [basicFormState, handleBasicInputChange] = useEditableState(task);
    const energyUnitLabel = task?.energySavedUnit ? getEnergyUnitByKey(task.energySavedUnit).title : "Energy Saved Unit ...";

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

            const result = await IndicatorService.updateTask(submissionData);
            closeMe(true);

        } catch (error) {
            console.log(error);
            openErrorAlert();
        }
    }

    const handleEnergySavedUnitSelect = (item) => {
        handleBasicInputChange({
            target: {
                name: 'energySavedUnit',
                value: item.key,
            },
        });
    };

    const handleStatusSelect = (item) => {
        handleBasicInputChange({
            target: {
                name: 'status',
                value: item.key,
            },
        });
    };

    // Alert message
    const [messageAlert, setMessageAlert] = useState({ open: true, message: "", color: "dark" });
    const openErrorAlert = () => setMessageAlert({ open: true, message: "Something went wrong! Couldn't save data.", color: "error" });
    const openValidationAlert = () => setMessageAlert({ open: true, message: "Invalid data! Please check the fields.", color: "error" });
    const openInfoAlert = () => setMessageAlert({ open: true, message: "Updating data...", color: "dark" });
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
                        <MDTypography variant="h5">{task?.name}</MDTypography>
                        <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeMe} />
                    </MDBox>
                    <Divider sx={{ my: 0 }} />
                    <MDBox pl={6} pr={6} pt={2} pb={2}>
                        <Grid container>
                            <Grid item xs={12} mt={1} mb={2}>
                                <Dropdown
                                    name="status"
                                    label={task?.status}
                                    items={[{ key: task?.nextStatus, title: task?.nextStatus }]}
                                    onMenuItemClick={handleStatusSelect}
                                    valid={basicFormState.status.isValid}
                                    needValidation={false}
                                />
                            </Grid>
                            <Grid item xs={12} lg={5.8} mt={1}>
                                <MDInput
                                    label="Deadline"
                                    name="deadline"
                                    type="date"
                                    value={basicFormState.deadline.value}
                                    onChange={handleBasicInputChange}
                                    error={!basicFormState.deadline.isValid}
                                    helperText={!basicFormState.deadline.isValid ? "Invalid date" : ""}
                                    {...commonInputProps}
                                />
                            </Grid>
                            <Grid item xs={false} lg={0.4}>
                                <></>
                            </Grid>
                            <Grid item xs={12} lg={5.8} mt={1}>
                                <MDInput
                                    label="Planned Budget (EUR)"
                                    name="plannedBudget"
                                    type="number"
                                    value={basicFormState.plannedBudget.value}
                                    onChange={handleBasicInputChange}
                                    error={!basicFormState.plannedBudget.isValid}
                                    helperText={!basicFormState.plannedBudget.isValid ? "Invalid budget amount" : ""}
                                    {...commonInputProps}
                                />
                            </Grid>

                            <Grid item xs={12} md={5.8} mt={2}>
                                <MDInput
                                    label="Record expense"
                                    name="expense"
                                    type="number"
                                    value={basicFormState.expense.value}
                                    onChange={handleBasicInputChange}
                                    error={!basicFormState.expense.isValid}
                                    helperText={!basicFormState.expense.isValid ? "Invalid amount" : ""}
                                    {...commonInputPropsNotRequired}
                                />
                            </Grid>

                            <Grid item xs={false} md={6}>
                                <></>
                            </Grid>

                            <Grid item xs={12} lg={5.8} mt={2}>
                                <MDInput
                                    label="Expected Energy Saved"
                                    name="expectedEnergySaved"
                                    type="number"
                                    value={basicFormState.expectedEnergySaved.value}
                                    onChange={handleBasicInputChange}
                                    error={!basicFormState.expectedEnergySaved.isValid}
                                    helperText={!basicFormState.expectedEnergySaved.isValid ? "Invalid amount" : ""}
                                    {...commonInputPropsNotRequired}
                                />
                            </Grid>

                            <Grid item xs={false} lg={0.4}>
                                <></>
                            </Grid>

                            <Grid item xs={12} lg={5.8} mt={2}>
                                <MDInput
                                    label="Actual Energy Saved"
                                    name="actualEnergySaved"
                                    type="number"
                                    value={basicFormState.actualEnergySaved.value}
                                    onChange={handleBasicInputChange}
                                    error={!basicFormState.actualEnergySaved.isValid}
                                    helperText={!basicFormState.actualEnergySaved.isValid ? "Invalid amount" : ""}
                                    {...commonInputPropsNotRequired}
                                />
                            </Grid>

                            <Grid item xs={12} lg={5.8} mt={1}>
                                <Dropdown
                                    name="energySavedUnit"
                                    label={energyUnitLabel}
                                    items={energyUnits}
                                    onMenuItemClick={handleEnergySavedUnitSelect}
                                    valid={basicFormState.energySavedUnit.isValid}
                                    needValidation={false}
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
TaskEditModal.defaultProps = {
    isOpen: false,
};

const useEditableState = (task) => {
    const [formState, setFormState] = useState({
        indicatorId: { value: task?.indicatorId, isValid: true },
        id: { value: task?.id, isValid: true },
        name: { value: task?.name, isValid: true },
        deadline: { value: task?.deadline, isValid: true },
        status: { value: task?.status, isValid: true },
        plannedBudget: { value: task?.plannedBudget, isValid: true },
        actualBudged: { value: task?.actualBudged, isValid: true },
        expense: { value: 0.0, isValid: true },
        energySavedUnit: { value: task?.energySavedUnit, isValid: true },
        expectedEnergySaved: { value: task?.expectedEnergySaved, isValid: true },
        actualEnergySaved: { value: task?.actualEnergySaved, isValid: true }
    });

    // Update the form state when the task changes
    useEffect(() => {
        setFormState({
            indicatorId: { value: task?.indicatorId, isValid: true },
            id: { value: task?.id, isValid: true },
            name: { value: task?.name, isValid: true },
            deadline: { value: task?.deadline, isValid: true },
            status: { value: task?.status, isValid: true },
            plannedBudget: { value: task?.plannedBudget, isValid: true },
            actualBudget: { value: task?.actualBudget, isValid: true },
            expense: { value: task?.expense, isValid: true },
            energySavedUnit: { value: task?.energySavedUnit, isValid: true },
            expectedEnergySaved: { value: task?.expectedEnergySaved, isValid: true },
            actualEnergySaved: { value: task?.actualEnergySaved, isValid: true }
        });
    }, [task]);

    // Generalized input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let isValid = true;
        let isEmpty = value.trim() === '' ? true : false;

        if (name === 'plannedBudget' || name === 'expectedEnergySaved'
            || name === 'actualEnergySaved') {
            isValid = !isNaN(value) && (Number(value)) > 0;
        }

        if (formState.energySavedUnit !== '') {
            if (formState.expectedEnergySaved === '') {
                setFormState(prevState => ({
                    ...prevState,
                    ['expectedEnergySaved']: { value: '', isValid: false },
                }));
            }
        }

        if (name === 'expectedEnergySaved') {
            if (formState.energySavedUnit === '' && !isEmpty) {
                setFormState(prevState => ({
                    ...prevState,
                    ['energySavedUnit']: { value: '', isValid: false },
                }));
            }
        }

        setFormState(prevState => ({
            ...prevState,
            [name]: { value, isValid },
        }));
    };

    return [formState, handleInputChange];
};

export default TaskEditModal;