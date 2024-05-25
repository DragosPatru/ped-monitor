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

import PedService from "services/PedService";
import { commonInputProps, commonInputPropsNotRequired } from "constants/component-properties"

function EditModal({ pedOverview, isOpen, onClose }) {
  const [basicFormState, handleBasicInputChange] = useEditablePedState(pedOverview);

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

    try {
      openInfoAlert();
      const result = await PedService.update(pedOverview.ped.id, submissionData);
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
            <MDTypography variant="h5">Update PED details</MDTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeMe} />
          </MDBox>
          <Divider sx={{ my: 0 }} />
          <MDBox pl={6} pr={6} pt={2} pb={2}>

            <Grid container>

              <Grid item xs={12}>
                <MDInput
                  label="Name"
                  name="name"
                  type="text"
                  value={basicFormState.name.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.name.isValid}
                  helperText={!basicFormState.name.isValid ? "Value required" : ""}
                  {...commonInputProps}
                />
              </Grid>

              <Grid item xs={12} md={12} mt={1}>
                <MDInput
                  label="Description"
                  name="description"
                  value={basicFormState.description.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.description.isValid}
                  helperText={!basicFormState.description.isValid ? "No more than 250 characters" : ""}
                  {...commonInputPropsNotRequired}
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12} md={5.8} mt={1}>
                <MDInput
                  label="People reached (no.)"
                  name="peopleReached"
                  type="number"
                  value={basicFormState.peopleReached.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.peopleReached.isValid}
                  helperText={!basicFormState.peopleReached.isValid ? "Value must be between 0 and " + pedOverview.ped.focusDistrictPopulation : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={false} lg={0.4}>
                <></>
              </Grid>

              <Grid item xs={12} md={5.8} mt={1}>
                <MDInput
                  label="Total Money Spent (EUR)"
                  name="moneySpent"
                  type="number"
                  value={basicFormState.moneySpent.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.moneySpent.isValid}
                  helperText={!basicFormState.moneySpent.isValid ? "Value must greater than 0" : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={12} md={5.8} mt={1}>
                <MDInput
                  label="Return Of Investment (years)"
                  name="returnOfInvestment"
                  type="number"
                  value={basicFormState.returnOfInvestment.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.returnOfInvestment.isValid}
                  helperText={!basicFormState.returnOfInvestment.isValid ? "Value must greater than 0" : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={false} lg={0.4}>
                <></>
              </Grid>

              <Grid item xs={12} md={5.8} mt={1}>
                <MDInput
                  label="Internal success rate (%)"
                  name="internalSuccessRate"
                  type="number"
                  value={basicFormState.internalSuccessRate.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.internalSuccessRate.isValid}
                  helperText={!basicFormState.internalSuccessRate.isValid ? "Value must greater than 0" : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={12} >
                <MDBox borderRadius="lg" mb={0} mt={2}>
                  <MDTypography variant="subtitle2" color="dark" fontWeight="bold" mb={2}>
                    Factors and data-sources for the current year
                  </MDTypography>
                </MDBox>
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12} >
                <MDBox borderRadius="lg" mb={0} mt={2}>
                  <MDTypography variant="subtitle2" color="secondary" fontWeight="bold" mb={2}>
                    GHG emission(s)
                  </MDTypography>
                </MDBox>
              </Grid>

              <Grid item xs={5.8}>
                <Grid item xs={12}>
                  <Grid item xs={12} >
                    <MDBox borderRadius="lg" mt={-1}>
                      <MDTypography variant="body2" color="secondary" fontWeight="bold" mb={2}>
                        Electricity
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <MDInput
                    label="Factor value (t CO2-eq/MWh)"
                    name="ghgEmissionFactorElectricity"
                    type="number"
                    value={basicFormState.ghgEmissionFactorElectricity.value}
                    onChange={handleBasicInputChange}
                    error={!basicFormState.ghgEmissionFactorElectricity.isValid}
                    helperText={!basicFormState.ghgEmissionFactorElectricity.isValid ? "Value required" : ""}
                    {...commonInputProps}
                  />
                </Grid>
                <Grid item xs={12} mt={1}>
                  <MDInput
                    label="Data-source"
                    name="ghgEmissionFactorElectricitySource"
                    type="text"
                    value={basicFormState.ghgEmissionFactorElectricitySource.value}
                    onChange={handleBasicInputChange}
                    error={!basicFormState.ghgEmissionFactorElectricitySource.isValid}
                    helperText={!basicFormState.ghgEmissionFactorElectricitySource.isValid ? "Value required" : ""}
                    {...commonInputProps}
                  />
                </Grid>
              </Grid>
              <Grid item xs={0.4}>
                <></>
              </Grid>
              <Grid item xs={5.8}>
                <Grid item xs={12} >
                  <MDBox borderRadius="lg" mt={-1}>
                    <MDTypography variant="body2" color="secondary" fontWeight="bold" mb={2}>
                      Heat/cold generated in the district
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12}>
                  <MDInput
                    label="Factor value (t CO2-eq/MWh)"
                    name="ghgEmissionFactorForHeathColdGenerated"
                    type="number"
                    value={basicFormState.ghgEmissionFactorForHeathColdGenerated.value}
                    onChange={handleBasicInputChange}
                    error={!basicFormState.ghgEmissionFactorForHeathColdGenerated.isValid}
                    helperText={!basicFormState.ghgEmissionFactorForHeathColdGenerated.isValid ? "Value required" : ""}
                    {...commonInputProps}
                  />
                </Grid>
                <Grid item xs={12} mt={1}>
                  <MDInput
                    label="Data-source"
                    name="ghgEmissionFactorForHeathColdGeneratedSource"
                    type="text"
                    value={basicFormState.ghgEmissionFactorForHeathColdGeneratedSource.value}
                    onChange={handleBasicInputChange}
                    error={!basicFormState.ghgEmissionFactorForHeathColdGeneratedSource.isValid}
                    helperText={!basicFormState.ghgEmissionFactorForHeathColdGeneratedSource.isValid ? "Value required" : ""}
                    {...commonInputProps}
                  />
                </Grid>
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
EditModal.defaultProps = {
  isOpen: false,
};

const useEditablePedState = (pedOverview) => {
  const [formState, setFormState] = useState({
    name: { value: pedOverview.ped.name, isValid: true },
    description: { value: pedOverview.ped.description, isValid: true },
    peopleReached: { value: pedOverview.ped.peopleReached, isValid: true },
    internalSuccessRate: { value: pedOverview.ped.internalSuccessRate, isValid: true },
    moneySpent: { value: pedOverview.ped.moneySpent, isValid: true },
    returnOfInvestment: { value: pedOverview.ped.returnOfInvestment, isValid: true },

    referenceYear: { value: pedOverview.lastYearReport.year, isValid: true },
    primaryEnergyFactor: { value: pedOverview.lastYearReport.energySourceFactors.primaryEnergyFactor, isValid: true },
    ghgEmissionFactorElectricity: { value: pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorElectricity, isValid: true },
    ghgEmissionFactorElectricitySource: { value: pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorElectricitySource, isValid: true },
    ghgEmissionFactorForHeathColdGenerated: { value: pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorForHeathColdGenerated, isValid: true },
    ghgEmissionFactorForHeathColdGeneratedSource: { value: pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorForHeathColdGeneratedSource, isValid: true }
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

    if (name === 'returnOfInvestment' || name === 'moneySpent'
      || name === 'internalSuccessRate') {
      if (!isEmpty) {
        isValid = !isNaN(value) && (Number(value)) > 0;
      }
    }

    if (name === 'peopleReached') {
      if (!isEmpty) {
        const isNumber = !isNaN(value);
        isValid = isNumber && ((Number(value)) > 0) &&
          ((Number(value)) <= Number(pedOverview.ped.focusDistrictPopulation));
      }
    }


    setFormState(prevState => ({
      ...prevState,
      [name]: { value, isValid },
    }));
  };

  return [formState, handleInputChange];
};

export default EditModal;