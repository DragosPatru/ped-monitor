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
import IndicatorsStatsGhg from "./components/indicatorsStatsGhg";
import EnergySourcesModal from "./components/energySourcesModal";

// service
import PedService from "services/PedService";

import { getCountryByKey } from "constants/eu-countries"
import GaugeChart from "fragments/Charts/GaugeChart";

function PedOverview() {
  const { pedId } = useParams();
  const [pedOverview, setPedOverview] = useState({});

  // Edit Modal
  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = (needReload = false) => {
    setEditModalOpen(false);
    if (needReload === true) {
      window.location.reload(false)
    }
  }

  const [energySourcesModalOpen, setEnergySourcesModalOpen] = useState(false);
  const openEnergySourcesModal = () => setEnergySourcesModalOpen(true);
  const closeEnergySourcesModal = () => setEnergySourcesModalOpen(false);

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

  //
  // Errors and loading state
  //
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
                  <EnergySourcesModal pedId={pedId} isOpen={energySourcesModalOpen} onClose={closeEnergySourcesModal} />
                </MDBox>

                <MDBox mt={3} mb={3} p={2}>
                  <Grid container spacing={2}>
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
                      <Grid container spacing={2} mt={1}>
                        <Grid item xs={10} md={6}>
                          <MDBox mb={2}>
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

                        {pedOverview.rateOfPeopleReached && (
                          <Grid item xs={10} md={6}>
                            <MDBox>
                              <ComplexStatisticsCard
                                color="dark"
                                icon="person_outline"
                                title="Rate of people reached"
                                count={pedOverview.rateOfPeopleReached + " %"}
                                percentage={{
                                  color: "success",
                                  amount: "",
                                  label: "Percentage of population impacted",
                                }}
                              />
                            </MDBox>
                          </Grid>)}

                        <Grid item xs={10} md={6}>
                          <MDBox mb={2}>
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

                        {pedOverview.ped.peopleReached !== null && (
                          <Detail label="People Reached" textValue={pedOverview.ped.peopleReached + ""} />
                        )}

                        {pedOverview.ped.moneySpent !== null && (
                          <Detail label="Money Spent" textValue={pedOverview.ped.moneySpent + " EUR"} />
                        )}

                        {pedOverview.ped.internalSuccessRate !== null && (
                          <Detail label="Internal Success Rate" textValue={pedOverview.ped.internalSuccessRate + " %"} />
                        )}

                        {pedOverview.ped.returnOfInvestment !== null ? (
                          <Detail label="Return of Investment" textValue={pedOverview.ped.returnOfInvestment + " years"} />
                        ) : (<></>)}
                      </DetailsCard>
                    </Grid>

                    {/* <Grid item xs={12}>
                  <Divider />
                  </Grid> */}


                    <Grid item xs={12} md={6}>
                      <DetailsCard title="Frequently changed factors" description={"Values for the year '" + pedOverview.lastYearReport.year + "'. They can be updated every year between baseline and target."} shadow={true}
                        button={<MDButton variant="text" color="secondary" size="large" onClick={openEnergySourcesModal}>
                          <Icon>open_in_new</Icon>&nbsp;All values
                        </MDButton>}>
                        <Detail label="Primary Energy Factor" textValue={pedOverview.lastYearReport.energySourceFactors.primaryEnergyFactor + ""} />

                        <MDBox borderRadius="lg" mb={0} mt={1}>
                          <MDTypography variant="subtitle2" color="secondary" fontWeight="regular" mb={2}>
                            GHG emission(s)
                          </MDTypography>
                        </MDBox>

                        <MDBox pl={1}>
                          <Grid container>
                            <Detail label="Factor for electricity" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorElectricity + " (t CO2-eq/MWh)"} />
                            <Detail label="Factor for electricity - source" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorElectricitySource} />
                            <Detail label="Factor for heat/cold generated in the district" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorForHeathColdGenerated + " (t CO2-eq/MWh)"} />
                            <Detail label="Factor for heat/cold generated in the district - source" textValue={pedOverview.lastYearReport.energySourceFactors.ghgEmissionFactorForHeathColdGeneratedSource} />
                          </Grid>
                        </MDBox>
                      </DetailsCard>
                    </Grid>

                    {pedOverview.overallRes && (
                      <Grid item xs={12} md={4} mt={2}>
                        <GaugeChart
                          icon={{ color: "info", component: "leaderboard" }}
                          title="Renewable Energy - max. achievement rate"
                          description="Progress against the baseline year value"
                          chart={{
                            datasets: {
                              label: "Progress",
                              backgroundColors: ["success", "secondary"],
                              data: [pedOverview.overallRes, 100],
                            },
                          }}
                        />
                      </Grid>)}

                      {pedOverview.overallGhg && (
                      <Grid item xs={8} md={4} mt={2}>
                        <GaugeChart
                          icon={{ color: "dark", component: "leaderboard" }}
                          title="Max. achievement rate for rewable energy"
                          description="Progress against the baseline year value"
                          chart={{
                            datasets: {
                              label: "Progress",
                              backgroundColors: ["success", "secondary"],
                              data: [pedOverview.overallGhg, 100],
                            },
                          }}
                        />
                      </Grid>)}

                      {pedOverview.overallResGhg && (
                      <Grid item xs={8} md={4} mt={2}>
                        <GaugeChart
                          icon={{ color: "success", component: "leaderboard" }}
                          title="Max. achievement rate for Greenhouse Gas Emissions"
                          description="Progress against the emissions in baseline year"
                          chart={{
                            datasets: {
                              label: "Progress",
                              backgroundColors: ["success", "secondary"],
                              data: [pedOverview.overallResGhg, 100],
                            },
                          }}
                        />
                      </Grid>)}

                    <Grid item xs={12}>
                      <DetailsCard title="PED Indicators" description={" "} shadow={true}>
                        <IndicatorsStats kpis={pedOverview.kpis} indicatorsStats={pedOverview.indicatorsStats} />
                        <IndicatorsStatsGhg kpis={pedOverview.kpis} />
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