/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import DefaultPedCard from "examples/Cards/ProjectCards/DefaultPedCard";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PedsOverview() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DefaultPedCard
              icon="account_balance"
              title="PED ONE"
              description="This is a first description of a PED"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view PED",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DefaultPedCard
              icon="account_balance"
              title="PED ONE"
              description="This is a first description of a PED"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view PED",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DefaultPedCard
              icon="account_balance"
              title="PED ONE"
              description="This is a first description of a PED"
              action={{
                type: "internal",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view PED",
              }}
            />
          </Grid>

        </Grid>

      </MDBox>

    </DashboardLayout>
  );
}

export default PedsOverview;
