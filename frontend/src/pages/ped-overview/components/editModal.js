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

import HelpInputLabelLarge from "fragments/Labels/helpInputLabelLarge"
import PedService from "services/PedService";
import { commonInputProps, commonInputPropsNotRequired } from "constants/component-properties"

function EditModal({ pedOverview, isOpen, onClose }) {
  const [basicFormState, handleBasicInputChange, resetFormState] = useEditablePedState(pedOverview);

  const closeMe = (triggerReload = false) => {
    closeMessageAlert();
    onClose(triggerReload);
  }
  // Effect to reset form state when modal opens
  useEffect(() => {
    if (isOpen) {
      resetFormState();
    }
  }, [isOpen]);

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
        if (value) {
          // Convert to number if possible, otherwise keep as original
          acc[key] = Number.isFinite(+value) ? +value : value;
        }
        return acc;
      }, {}),
    };

    try {
      openInfoAlert();
      await PedService.update(pedOverview.ped.id, submissionData);
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
                  label={
                    <HelpInputLabelLarge label={"People reached (no.) "} helpText={"percentage of people from focus district directly impacted by the initiatives to support PED (e.g.: triggered investments and created jobs, or reduction of energy bills per household)"} />
                  }
                  name="peopleReached"
                  type="number"
                  value={basicFormState.peopleReached?.value}
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
                  label={
                    <HelpInputLabelLarge label={"Total Money Spent (EUR) "} helpText={"total investment of initiatives to facilitate PED; the total investment refers to the the sum of the budget of all tasks and any other aditional investments that may have been implemented in order to facilitate the PED (e.g. salary of project managers from municipality or other functions that are responsible for the oversight of projects implementation)"} />
                  }
                  name="moneySpent"
                  type="number"
                  value={basicFormState.moneySpent?.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.moneySpent.isValid}
                  helperText={!basicFormState.moneySpent.isValid ? "Value must greater than 0" : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={12} md={5.8} mt={1}>
                <MDInput
                  label={
                    <HelpInputLabelLarge label={"Return Of Investment (years) "} helpText={"no. of years in which investment is depreciated"} />
                  }
                  name="returnOfInvestment"
                  type="number"
                  value={basicFormState.returnOfInvestment?.value}
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
                  label={
                    <HelpInputLabelLarge label={"Internal success rate (%) "} helpText={"success rate of the project (according to internal KPIs set up by the user)"} />
                  }
                  name="internalSuccessRate"
                  type="number"
                  value={basicFormState.internalSuccessRate?.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.internalSuccessRate.isValid}
                  helperText={!basicFormState.internalSuccessRate.isValid ? "Value must greater than 0" : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={12} >
                <MDBox borderRadius="lg" mb={0} mt={2}>
                  <MDTypography variant="subtitle2" color="dark" fontWeight="bold" mb={2}>
                    Factors and energy-sources for the reference year
                  </MDTypography>
                </MDBox>
              </Grid>

              <Grid item xs={12} lg={5.8}>
                <MDInput
                  label={
                    <HelpInputLabelLarge label={"Reference Year *"} helpText={"The year for which the Energy factors and sources should be updated."} />
                  }
                  name="referenceYear"
                  type="number"
                  value={basicFormState.referenceYear.value}
                  onChange={handleBasicInputChange}
                  error={!basicFormState.referenceYear.isValid}
                  helperText={!basicFormState.referenceYear.isValid ? "Year must be between '" + pedOverview?.ped?.baselineYear + "' and '" + pedOverview?.ped?.targetYear + "'" : ""}
                  {...commonInputPropsNotRequired}
                />
              </Grid>

              <Grid item xs={12} mt={2}>
                <MDInput
                  label={
                    <HelpInputLabelLarge label={"Primary Energy Factor *"}
                      helpText={"yearly primary energy factor may be the pre-selected default European average of"
                        + " 1.9 OR can be insert manually; according to Art. 13 of Directive (EU) 2023/1791 "
                        + "(available <a style='color: yellow;font-weight: bold;' target='_blank' href='https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ%3AJOL_2023_231_R_0001&qid=1695186598766'>here</a>),"
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
                    label={
                      <HelpInputLabelLarge label={"Factor value (t CO2-eq/MWh) *"} helpText={"Please insert yearly emission factors for grid electricity. Emission factors may be obtained:<br/><strong>(1) from electricity provider (suggested) and should be updated anually</strong> <br/>(2) from international databases such as IPPC." +
                        "<br/>IMPORTANT: all yearly conversion factors introduced in the tool must be from the same source (e.g. energy provider) for all the monitoring years." +
                        "<br/>Examples of open-source database: Joint Research Centre Data Catalogue <br/> -> please select the lates version of GHG Emission Factors for Electricity Consumption <br/>-> Table 3: CoM emission factors for national electricity for EU member states, Iceland and Norway: Life-cycle (LC) approach, GHG emissions in tonnes CO2-eq/MWh <br/>-> select the conversion factor closest to your baseline year <br/>-> yearly check the database for updates " +
                        "<a style='color: yellow;font-weight: bold;' target='_blank' href='https://data.jrc.ec.europa.eu/collection/id-00172'>here</a>"} />
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
                <Grid item xs={12} mt={1}>
                  <MDInput
                    label={
                      <HelpInputLabelLarge label={"Energy-source *"} helpText={"source of yearly emission factor provided for electricity;<br/> IMPORTANT: all yearly emission factors introduced in the tool must be from the same source (e.g. energy provider) for all the monitoring years."} />
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
                    label={
                      <HelpInputLabelLarge label={"Factor value (t CO2-eq/MWh) *"} helpText={"Please insert yearly emission factors for locally produced heat (or cold), if local powerplants are in place for the district. Emission factors may be obtained:<br/>(1) from generation facility, based on specific studies <br/>(2) from international databases such as IPPC." +
                        "<br/> IMPORTANT: all yearly emission factors introduced in the tool must be from the same source (e.g. IPPC) for all the monitoring years." +
                        "<br/> Examples of open-source database: Joint Research Centre Data Catalogue <br/>-> please select the lates version of GHG Emission Factors for Local Energy Use <br/>-> Table 1 & Table 2 <br/>-> select the conversion factor according to the source of energy used within your facility <br/>-> yearly check the database for updates " +
                        "<a style='color: yellow;font-weight: bold;' target='_blank' href='https://data.jrc.ec.europa.eu/collection/id-00172'>here</a>"} />
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
                <Grid item xs={12} mt={1}>
                  <MDInput
                    label={
                      <HelpInputLabelLarge label={"Energy-source *"} helpText={"source of yearly emission factor provided for electricity;<br/>IMPORTANT: all yearly emission factors introduced in the tool must be from the same source (e.g. IPPC) for all the monitoring years."} />
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
  const initialState = {
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
  };
  const [formState, setFormState] = useState(initialState);

  // Generalized input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let isValid = true;
    let isEmpty = value.trim() === '' ? true : false;

    if (name === 'referenceYear') {
      isValid = !isNaN(value) && (Number(value)) >= pedOverview.ped.baselineYear && (Number(value)) <= pedOverview.ped.targetYear;
    }

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

  const resetFormState = () => {
    setFormState(initialState);
  };

  return [formState, handleInputChange, resetFormState];
};

export default EditModal;