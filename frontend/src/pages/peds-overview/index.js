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

function PedsOverview() {

  const [peds, setPeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error"
      content="Could not retrieve data from the server !"
      dateTime="2 seconds ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const alertContent = () => (
    <MDTypography variant="body2" color="white">
      There is no PED defined at the moment. You can define one using the dedicated page.
    </MDTypography>
  );

  useEffect(() => {
    const fetchPeds = async () => {
      setLoading(true);
      try {
        const data = await PedService.getAll();
        if (data?.length === 0) {
          console.log('array is empty');
          setNoDataFound(true);

        } else {
          setPeds(data);
        }

      } catch (error) {
        console.error("Failed to fetch PEDs:", error);
        openErrorSB();

      } finally {
        setLoading(false);
      }
    };

    fetchPeds();
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SimpleBackdrop open={loading} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {peds.map((ped, index) => (
            <Grid item xs={12} md={6} lg={3}>
              <DefaultPedCard key={`ped-${index}`}
                icon="account_balance"
                title={ped.title} // Assuming 'ped' has a 'title'
                description={ped.description}
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view PED",
                }}
              />
            </Grid>
          ))}


          <Grid item xs={12} lg={8}>
            {noDataFound ? (
              <MDAlert color="info" dismissible>
                {alertContent()}
              </MDAlert>) : null}
            <MDBox p={2}>
              {renderErrorSB}
            </MDBox>
          </Grid>



        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default PedsOverview;
