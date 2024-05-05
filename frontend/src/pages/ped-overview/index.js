import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// custom components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// fragments
import DashboardLayout from "fragments/Layouts/DashboardLayout";
import DashboardNavbar from "fragments/Navbars/DashboardNavbar";
import SimpleBackdrop from "fragments/Backdrop";

import DetailsCard from "./components/detailsCard";
import Detail from "./components/detail";
import EditModal from "./components/editModal";

// service
import PedService from "services/PedService";

function PedOverview() {
  const { pedId } = useParams();
  const [pedOverview, setPedOverview] = useState({});

  const [errorSB, setErrorSB] = useState(false);

  // avoid UI errors in case of backend issues
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const closeEditModal = () => setEditModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);

  const [backdropOpen, setBackdropOpen] = useState(false);
  const openBackdrop = () => {
    setLoading(true);
    setError(false);
    setBackdropOpen(true);
  };
  const closeBackdrop = () => {
    setBackdropOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      openBackdrop();
      try {
        console.log("fetching data ...");
        const overview = await PedService.getPedOverview(pedId);
        setPedOverview(overview);

      } catch (error) {
        // Handle error
        console.error('Error fetching PED data:', error);
        setError(true);
        openErrorSB();

      } finally {
        setLoading(false);
        closeBackdrop();
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [pedId]);


  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Could not retrieve data from the server !"
      dateTime="2 second(s) ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>

        {!error && !loading && (
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card sx={{
                backgroundColor: "#f0f2f5",
                boxShadow: 0
              }}>

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


                  <MDButton variant="text" color="light" size="large" onClick={openEditModal}>
                    <Icon>edit</Icon>&nbsp;edit
                  </MDButton>

                  <EditModal pedData={pedOverview.ped} isOpen={editModalOpen} onClose={closeEditModal}/>

                </MDBox>



                <MDBox mt={5} mb={3} p={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <MDBox mb={2} lineHeight={1} pl={1}>
                        <MDTypography variant="body2" color="text" fontWeight="regular">
                          {pedOverview.ped.description}
                        </MDTypography>
                      </MDBox>
                      <MDBox opacity={0.6}>
                        <Divider />
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <DetailsCard title="PED Basics" description="" shadow={true}>
                        <Detail label="Name" textValue={pedOverview.ped.name} />
                        <Detail label="Country" textValue={pedOverview.ped.country} />
                        <Detail label="Baseline Year" textValue={pedOverview.ped.baselineYear} />
                        <Detail label="Target Year" textValue={pedOverview.ped.targetYear} />
                        <Detail label="Self Supply Renewable Energy In Baseline" textValue={pedOverview.ped.percentSelfSupplyRenewableEnergyInBaseline + "%"} />
                        <Detail label="GHG Emissions Total In Baseline" textValue={pedOverview.ped.ghgEmissionsTotalInBaseline + " (tCO2eq/a)"} />
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
          </Grid>)}
      </MDBox>

      <SimpleBackdrop open={backdropOpen} handleClose={closeBackdrop} />
      <MDBox p={2}>
        {renderErrorSB}
      </MDBox>

    </DashboardLayout>

  );
}

export default PedOverview;