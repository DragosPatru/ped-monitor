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

import IndicatorService from "services/IndicatorService";

function TaskDeleteModal({ task, isOpen, onClose }) {

  const closeMe = (triggerReload = false) => {
    closeMessageAlert();
    onClose(triggerReload);
  }

  const saveData = async (e) => {
    e.preventDefault();
    closeMessageAlert();

    try {
      openInfoAlert();
      const result = await IndicatorService.deleteTask(task?.id);
      closeMe(true);

    } catch (error) {
      openErrorAlert();
    }
  }

  // Alert message
  const [messageAlert, setMessageAlert] = useState({ open: true, message: "", color: "dark" });
  const openErrorAlert = () => setMessageAlert({ open: true, message: "Something went wrong! Couldn't delete data.", color: "error" });
  const openInfoAlert = () => setMessageAlert({ open: true, message: "Deleting data...", color: "dark" });
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
            <MDTypography variant="h5">Delete Task</MDTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={closeMe} />
          </MDBox>
          <Divider sx={{ my: 0 }} />
          <MDBox pl={6} pr={6} pt={2} pb={2}>
            <Grid container>
              <Grid item xs={12} >
                <MDBox p={2} textAlign="center">
                  <MDTypography variant="h5">{"Are you sure you want to delete '" + task?.name + "' ?"} </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} mt={1}>
                {renderTextAlert}
              </Grid>
            </Grid>

          </MDBox>
          <Divider sx={{ my: 0 }} />

          <MDBox display="flex" justifyContent="space-between" p={3}>
            <MDButton variant="gradient" color="dark" onClick={closeMe}>
              cancel
            </MDButton>
            <MDButton variant="gradient" color="error" onClick={saveData}>
              delete
            </MDButton>
          </MDBox>
        </MDBox>
      </Slide>
    </Modal>
  );
}

export default TaskDeleteModal;