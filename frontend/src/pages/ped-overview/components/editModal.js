import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDInput from "components/MDInput";

// service
import PedService from "services/PedService";

function EditModal({ pedData, isOpen, onClose }) {
  const [basicFormState, handleBasicInputChange] = useEditablePedState(pedData);

  const navigate = useNavigate();

  const saveData = async (e) => {
    closeMessageAlert();
    const allValid = Object.values(basicFormState).every(field => field.isValid);
    if (!allValid) {
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

    try {
      openInfoAlert();
      const result = await PedService.update(pedData.id, submissionData);
      return navigate("/peds/" + pedData.id);

    } catch (error) {
      openErrorAlert();
    }
  }

  // Alert message
  const [messageAlert, setMessageAlert] = useState({ open: false, message: "", color: "dark" });
  const openErrorAlert = () => setMessageAlert({ open: true, message: "Something went wrong!", color: "error" });
  const openInfoAlert = () => setMessageAlert({ open: true, message: "Updating data...", color: "dark" });
  const closeMessageAlert = () => setMessageAlert({ open: false, message: "", color: "dark" });
  const renderMessageAlert = () => (
    <MDAlert color={messageAlert.color} open={messageAlert.open} dismissible closeCallback={closeMessageAlert}>
      <MDTypography variant="body2" color="white">
        messageAlert.message
      </MDTypography>
    </MDAlert>
  );

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ display: "grid", placeItems: "center" }}>
      <Slide direction="down" in={isOpen} timeout={500}>
        <MDBox
          position="relative"
          width="500px"
          display="flex"
          flexDirection="column"
          borderRadius="xl"
          bgColor="white"
          shadow="xl"
        >
          <MDBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
            <MDTypography variant="h5">Your modal title</MDTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={onClose} />
          </MDBox>
          <Divider sx={{ my: 0 }} />
          <MDBox p={2}>

            <Grid container>
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
            </Grid>


          </MDBox>
          <Divider sx={{ my: 0 }} />
          {renderMessageAlert}

          <MDBox display="flex" justifyContent="space-between" p={1.5}>
            <MDButton variant="gradient" color="dark" onClick={onClose}>
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
EditModal.defaultProps = {
  isOpen: false,
};

const useEditablePedState = (pedData) => {
  const [formState, setFormState] = useState({
    name: { value: pedData.name, isValid: true },
    description: { value: pedData.description, isValid: true },
    primaryEnergyFactor: { value: pedData.primaryEnergyFactor, isValid: true },
    ghgEmissionFactorElectricity: { value: pedData.ghgEmissionFactorElectricity, isValid: true },
    ghgEmissionFactorElectricitySourceCode: { value: pedData.ghgEmissionFactorElectricitySourceCode, isValid: true },
    ghgEmissionFactorForHeathColdGenerated: { value: pedData.ghgEmissionFactorForHeathColdGenerated, isValid: true },
    ghgEmissionFactorForHeathColdGeneratedSourceCode: { value: pedData.ghgEmissionFactorForHeathColdGeneratedSourceCode, isValid: true }
  });

  // Generalized input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;
    let isEmpty = value.trim() === '' ? true : false;

    if (name === 'name') {
      isValid = !isEmpty && (value.length < 250);
    }

    if (name === 'description') {
      isValid = isEmpty || (value.length < 250);
    }

    setFormState(prevState => ({
      ...prevState,
      [name]: { value, isValid },
    }));
  };

  return [formState, handleInputChange];
};

const commonInputProps = {
  variant: "standard",
  InputLabelProps: { shrink: true, style: { fontSize: "1.2rem" } },
  inputProps: { style: { fontSize: "1.05rem" } },
  fullWidth: true,
  required: true,
};


export default EditModal;