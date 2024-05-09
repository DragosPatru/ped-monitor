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
import ComplexStatisticsCard from "fragments/Cards/StatisticsCards/ComplexStatisticsCard";

import DetailsCard from "./components/detailsCard";
import Detail from "./components/detail";
import EditModal from "./components/editModal";
import IndicatorsStats from "./components/indicatorsStats";

// service
import PedService from "services/PedService";

import { getCountryByKey } from "constants/eu-countries"

function PedOverview() {
  const { pedId } = useParams();
  const [pedOverview, setPedOverview] = useState({});

  const [errorSB, setErrorSB] = useState(false);

  // avoid UI errors in case of backend issues
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const closeEditModal = (needReload = false) => {
    setEditModalOpen(false);
    if (needReload === true) {
      window.location.reload(false)
    }
  }
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
        const overview = await PedService.getPedOverview(pedId);
        setPedOverview(overview);
        if (overview.ped.targetYear < (new Date().getFullYear())) {
          setEditButtonVisible(false);
        }

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
                      {pedOverview.ped.name}
                    </MDTypography>
                  </MDBox>

                  {editButtonVisible && (
                    <MDButton variant="text" color="light" size="large" onClick={openEditModal}>
                      <Icon>edit</Icon>&nbsp;edit
                    </MDButton>)}

                  <EditModal pedOverview={pedOverview} isOpen={editModalOpen} onClose={closeEditModal} />

                </MDBox>

                <MDBox mt={3} mb={3} p={2}>
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
                        <Detail label="Country" textValue={getCountryByKey(pedOverview.ped.countryCode).title} />
                        <Detail label="Baseline Year" textValue={pedOverview.ped.baselineYear} />
                        <Detail label="Target Year" textValue={pedOverview.ped.targetYear} />
                        <Detail label="Self Supply Renewable Energy In Baseline" textValue={pedOverview.ped.percentSelfSupplyRenewableEnergyInBaseline + "%"} />
                        <Detail label="GHG Emissions Total In Baseline" textValue={pedOverview.ped.ghgEmissionsTotalInBaseline + " (tCO2eq/a)"} />
                      </DetailsCard>
                    </Grid>


                    <Grid item xs={12} md={6}>
                      <Grid container spacing={1} mt={1}>
                        <Grid item xs={10} md={5}>
                          <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                              icon="leaderboard"
                              title="Density of Focus District"
                              count={pedOverview.densityOfFocusDistrict + "/ m²"}
                              percentage={{
                                color: "success",
                                amount: "",
                                label: "no. of citizens / m² of total area",
                              }}
                            />
                          </MDBox>
                        </Grid>

                        <Grid item xs={10} md={5}>
                          <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                              color="success"
                              icon="store"
                              title="Built-up density"
                              count={pedOverview.builtUpDensity + ""}
                              percentage={{
                                color: "success",
                                amount: "",
                                label: "m² of built-up area / m² of total area",
                              }}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                    </Grid>


                    <Grid item xs={12} md={6}>
                      <DetailsCard title="Geospatial and Socioeconomics" description="" shadow={true}>
                        <Detail label="Size of focus district" textValue={pedOverview.ped.focusDistrictSize + " (sq. meters)"} />
                        <Detail label="Population of focus district" textValue={pedOverview.ped.focusDistrictPopulation + " people"} />
                        <Detail label="Build Up Area Size" textValue={pedOverview.ped.buildUpAreaSize + " (sq. meters)"} />
                        <Detail label="AVG Household Income" textValue={pedOverview.ped.avgHouseholdIncome + " EUR"} />
                        <Detail label="Heating Degree Days" textValue={pedOverview.ped.heatingDegreeDays + "  days/year"} />
                        <Detail label="Cooling Degree Days" textValue={pedOverview.ped.coolingDegreeDays + " days/year"} />
                      </DetailsCard>
                    </Grid>

                    {/* <Grid item xs={12}>
                  <Divider />
                  </Grid> */}


                    <Grid item xs={12} md={6}>
                      <DetailsCard title="Frequently changed factors" description={"Values for the year '" + pedOverview.lastYearReport.year + "'. They can be updated every year between baseline and target."} shadow={true}>
                        <Detail label="Primary Energy Factor" textValue={pedOverview.lastYearReport.energySourceFactors.primaryEnergyFactor + ""} />

                        <MDBox borderRadius="lg" mb={0} mt={1}>
                          <MDTypography variant="subtitle2" color="secondary" fontWeight="regular" mb={2}>
                            GHG emission(s)
                          </MDTypography>
                        </MDBox>

                        <MDBox pl={1}>
                          <Grid container>
                            <Detail label="Factor for electricity" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorElectricity + " (t CO2-eq/MWh)"} />
                            <Detail label="Factor for electricity - source" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorElectricitySourceCode} />
                            <Detail label="Factor for heat/cold generated in the district" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorForHeathColdGenerated + " (t CO2-eq/MWh)"} />
                            <Detail label="Factor for heat/cold generated in the district - source" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorForHeathColdGeneratedSourceCode} />
                          </Grid>
                        </MDBox>
                      </DetailsCard>
                    </Grid>

                    <Grid item xs={12}>
                      <IndicatorsStats kpis={pedOverview.kpis} indicatorsStats={pedOverview.indicatorsStats}/>
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