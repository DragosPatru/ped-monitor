import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// custom components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
// fragments
import DashboardLayout from "fragments/Layouts/DashboardLayout";
import DashboardNavbar from "fragments/Navbars/DashboardNavbar";
import ListInfoCard from "fragments/Cards/ListInfoCard";
import SimpleBackdrop from "fragments/Backdrop";

import DetailsCard from "./components/detailsCard";
import Detail from "./components/detail";

import backgroundImage from "assets/images/bg-profile.jpeg";

// service
import PedService from "services/PedService";

function PedOverview() {
  const { pedId } = useParams();
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Could not retrieve data from the server !"
      dateTime="1 second(s) ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const [backdropOpen, setBackdropOpen] = useState(true);
  const handleOpenBackdrop = () => {
    setBackdropOpen(true);
  };
  const handleCloseBackdrop = () => {
    setBackdropOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data ...");

        //const data = await PedService.fetchPedData(pedId); // Assuming PedService.fetchPedData is your fetching function
        //setPedData(data);
      } catch (error) {
        // Handle error
        console.error('Error fetching PED data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [pedId]);


  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <SimpleBackdrop open={backdropOpen} handleClose={handleCloseBackdrop} />
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>



              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox
                  variant="contained"
                  color="light"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  p={1} // Adjusted padding
                >
                  <Icon fontSize="large" color="inherit">
                    account_balance
                  </Icon>
                  <MDTypography variant="h5" color="light" ml={1}> {/* Added marginLeft */}
                    Resita
                  </MDTypography>
                </MDBox>

                
                  <MDButton variant="text" color="light" size="large">
                  <Icon>edit</Icon>&nbsp;edit
                  </MDButton>
                
                
              </MDBox>



              <MDBox mt={5} mb={3} p={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <MDBox mb={2} lineHeight={1} pl={1}>
                      <MDTypography variant="body2" color="text" fontWeight="regular">
                        "Hi, This is a demo description of a PED. In case it is longer, the aspect should be still fine and nice"
                      </MDTypography>
                    </MDBox>
                    <MDBox opacity={0.6}>
                      <Divider />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <DetailsCard title="PED Basics" description="" shadow={false}>
                      <Detail label="Name" textValue="Resita" />
                      <Detail label="Country" textValue="Romania" />
                      <Detail label="Baseline Year" textValue="2024" />
                      <Detail label="Target Year" textValue="2025" />
                      <Detail label="Self Supply Renewable Energy In Baseline" textValue="20%" />
                      <Detail label="GHG Emissions Total In Baseline" textValue="1234 (tCO2eq/a)" />
                    </DetailsCard>
                  </Grid>


                  <Grid item xs={12} md={6}>
                    <DetailsCard title="Size and Population" description="" shadow={true}>
                      <Detail label="Size of focus district" textValue="1234 (sq. meters)" />
                      <Detail label="Population of focus district" textValue="8000000 people" />
                      <Detail label="Build Up Area Size" textValue="1234 (sq. meters)" />
                      <Detail label="AVG Household Income" textValue="400 EUR" />
                      <Detail label="Heating Degree Days" textValue="120 days/year" />
                      <Detail label="Cooling Degree Days" textValue="45 days/year" />
                    </DetailsCard>
                  </Grid>

                  {/* <Grid item xs={12}>
                  <Divider />
                  </Grid> */}


                  <Grid item xs={12} md={8}>
                    <DetailsCard title="Frequently changed factors" description="Values for the current year. They can be updated every year between baseline and target." shadow={true}>
                      <Detail label="Primary Energy Factor" textValue="1.5" />

                      <MDBox borderRadius="lg" mb={0} mt={1}>
                        <MDTypography variant="subtitle2" color="dark" fontWeight="regular" mb={2}>
                          GHG emission(s)
                        </MDTypography>
                      </MDBox>

                      <MDBox pl={1}>
                        <Grid container>
                          <Detail label="Factor for electricity" textValue="2.0 (t CO2-eq/MWh)" />
                          <Detail label="Factor for electricity - source" textValue="Source A" />
                          <Detail label="Factor for heat/cold generated in the district" textValue="3.0 (t CO2-eq/MWh)" />
                          <Detail label="Factor for heat/cold generated in the district - source" textValue="Source B" />
                        </Grid>
                      </MDBox>
                    </DetailsCard>
                  </Grid>

                </Grid>
              </MDBox>

            </Card>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>

  );
}

export default PedOverview;