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

import Detail from "./detail";

import PedService from "services/PedService";

function EnergySourcesModal({ pedId, isOpen, onClose }) {
  const [energySources, setEnergySources] = useState([]);

  const closeMe = (triggerReload = false) => {
    closeMessageAlert();
    onClose(triggerReload);
  }

  useEffect(() => {
    fetchData();
  }, [pedId]);

  const fetchData = async () => {
    closeMessageAlert();

    try {
      openInfoAlert();
      const result = await PedService.getSourceFactorsHistory(pedId);
      setEnergySources(result.energySourceFactors);
      closeMessageAlert();

    } catch (error) {
      openErrorAlert();
    }
  }

  // Alert message
  const [messageAlert, setMessageAlert] = useState({ open: true, message: "", color: "dark" });
  const openErrorAlert = () => setMessageAlert({ open: true, message: "Something went wrong! Couldn't fetch data.", color: "error" });
  const openInfoAlert = () => setMessageAlert({ open: true, message: "Fetching data...", color: "dark" });
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
            <MDTypography variant="h5">Energy Source Factors</MDTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeMe} />
          </MDBox>
          <Divider sx={{ my: 0 }} />
          <MDBox pl={6} pr={6} pt={2} pb={2}>

            <Grid container>
                {energySources.map((es, index) => (
                  <Grid item xs={12} key={"card" + index} mt={index > 0 ? 2:1}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      {es.reportingYear + ""}
                    </MDTypography>
                    <Divider sx={{ my: 0 }} />
                    <Detail label="Primary Energy Factor" textValue={es.primaryEnergyFactor + ""} />

                    <MDBox borderRadius="lg" mb={0} mt={1}>
                      <MDTypography variant="subtitle2" color="secondary" fontWeight="regular" mb={2}>
                        GHG emission(s) factors
                      </MDTypography>
                    </MDBox>

                    <MDBox pl={1} mt={-2}>
                      <Grid container>
                        <Detail label="Electricity" textValue={es.ghgEmissionFactorElectricity + " (t CO2-eq/MWh)"} />
                        <Detail label="Electricity - source" textValue={es.ghgEmissionFactorElectricitySource} />
                        <Detail label="Heat/cold generated in the district" textValue={es.ghgEmissionFactorForHeathColdGenerated + " (t CO2-eq/MWh)"} />
                        <Detail label="Heat/cold generated in the district - source" textValue={es.ghgEmissionFactorForHeathColdGeneratedSource} />
                      </Grid>
                    </MDBox>
                  </Grid>
                ))
                }
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
          </MDBox>
        </MDBox>
      </Slide>
    </Modal>
  );
}

EnergySourcesModal.defaultProps = {
  isOpen: false,
};

export default EnergySourcesModal;