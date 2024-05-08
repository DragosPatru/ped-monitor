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

// service
import PedService from "services/PedService";

function IndicatorOverview() {
  const { indicatorId } = useParams();
  const [indicatorOverview, setIndicatorOverview] = useState({});

  const [errorSB, setErrorSB] = useState(false);

  // avoid UI errors in case of backend issues
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        //const overview = await PedService.getPedOverview(pedId);
        //setPedOverview(overview);

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

    //fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [indicatorId]);


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
                  py={2}
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
                    pl={1}
                  >
                    <Icon fontSize="large" color="inherit">
                      account_balance
                    </Icon>
                    <MDTypography variant="h5" color="light" ml={1}> {/* Added marginLeft */}
                      {indicatorId}
                    </MDTypography>
                  </MDBox>
                </MDBox>

                <MDBox mt={3} mb={3} p={2}>
                  <Grid container spacing={1}>


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

export default IndicatorOverview;