import { useState } from "react";

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

import IndicatorService from "services/IndicatorService";
import { commonInputProps } from "constants/component-properties"

function IndicatorConfigModal({ indicatorId, minTargetYear, maxTargetYear, isOpen, onClose }) {
  const [basicFormState, handleBasicInputChange] = useEditableState(minTargetYear, maxTargetYear);

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

    console.log(submissionData);
    try {
      openInfoAlert();
      const result = await IndicatorService.update(indicatorId, submissionData);
      closeMe(true);

    } catch (error) {
      openErrorAlert();
    }
  }

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
            <MDTypography variant="h5">Configure Indicator</MDTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeMe} />
          </MDBox>
          <Divider sx={{ my: 0 }} />
          <MDBox pl={6} pr={6} pt={2} pb={2}>
            <Grid container>
              <Grid item xs={12}>
                <MDInput
                  label="Target Year"
                  name="targetYear"
                  type="number"
                  value={basicFormState.targetYear.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.targetYear.isValid}
                  helperText={!basicFormState.targetYear.isValid ? "Value must between '" + minTargetYear + "' and '" + maxTargetYear + "'" : ""}
                  {...commonInputProps}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <MDInput
                  label="Target Value"
                  name="targetValue"
                  type="number"
                  value={basicFormState.targetValue.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.targetValue.isValid}
                  helperText={!basicFormState.targetValue.isValid ? "Value must be greater than '0'" : ""}
                  {...commonInputProps}
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
IndicatorConfigModal.defaultProps = {
  isOpen: false,
};

const useEditableState = (minYear, maxYear) => {
  const [formState, setFormState] = useState({
    targetValue: { value: '', isValid: false },
    targetYear: { value: '', isValid: false },
  });

  // Generalized input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;
    let isEmpty = value.trim() === '' ? true : false;

    if (name === 'targetYear') {
      isValid = !isNaN(value) && (Number(value)) >= minYear && (Number(value)) <= maxYear;
    }

    if (name === 'targetValue') {
      isValid = !isNaN(value) && (Number(value)) >= 0;
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: { value, isValid },
    }));
  };

  return [formState, handleInputChange];
};

export default IndicatorConfigModal;