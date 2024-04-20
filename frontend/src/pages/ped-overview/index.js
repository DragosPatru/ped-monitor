import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// custom components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// fragments
import DashboardLayout from "fragments/Layouts/DashboardLayout";
import DashboardNavbar from "fragments/Navbars/DashboardNavbar";
import DefaultPedCard from "fragments/Cards/DefaultPedCard";
import SimpleBackdrop from "fragments/Backdrop";

// service
import PedService from "services/PedService";

function PedOverview() {

    return (
        <DashboardLayout>
          <DashboardNavbar />
          <SimpleBackdrop open={loading} />
          <MDBox py={3}>
            <Grid container spacing={3}>




            </Grid>
          </MDBox>

        </DashboardLayout>
      );
    }

    export default PedOverview;