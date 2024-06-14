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
import MDProgress from "components/MDProgress";

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

  const [ssChartConfig, setSsChartConfig] = useState({});
  const [ghgChartConfig, setGhgChartConfig] = useState({});
  const [ghgResChartConfig, setGhgResChartConfig] = useState({});

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

        if (overview.pedStats.overallSs) {
          let overallSs = overview.pedStats.overallSs;
          let value = overallSs.currentValue.value.toFixed(2);
          let baselineValue = overallSs.baselineValue.value.toFixed(2);
          let bestValue = overallSs.bestValue.value.toFixed(2);
          let gaugeProps = calculateGaugeChartProps(value);
          setSsChartConfig(
            {
              title: "Progress of degree of renewable energy self-supply for " + overallSs.currentValue.year,
              description: "Progress against the baseline year value of " + baselineValue + " %. Highest value was " + bestValue + "% achieved in " + overallSs.bestValue.year,
              subtitle: <MDTypography textAlign="center" component="div" variant="button" color="text">
                This progress directly supports <strong>SGD 7</strong> Affordable and clean energy,
                indicator <strong>7.2.1</strong> Renewable energy share in the total final energy consumption.
              </MDTypography>,
              chart: {
                datasets: {
                  label: "Progress",
                  backgroundColors: [gaugeProps.color, "light"],
                  data: [value, gaugeProps.remainingToFill],
                }
              }
            })
        }

        if (overview.pedStats.overallGhg) {
          let overallGhg = overview.pedStats.overallGhg;
          let value = overallGhg.currentValue.value.toFixed(2);
          let baselineValue = overallGhg.baselineValue.value.toFixed(2);
          let bestValue = overallGhg.bestValue.value.toFixed(2);
          let gaugeProps = calculateGaugeChartProps(value);

          setGhgChartConfig({
            title: "Progress of Greenhouse Gas Emissions reduction rate for " + overallGhg.currentValue.year,
            subtitle: <MDTypography textAlign="center" component="div" variant="button" color="text">
              This progress directly supports <strong>SDG 13</strong> Climate actions, indicator <strong>13.2.2</strong>
              Total greenhouse gas emissions per year.
            </MDTypography>,
            description: "Progress against the baseline year value of " + baselineValue + " tCO2eq/a. Lowest value was " + bestValue + " tCO2eq/a achieved in " + overallGhg.bestValue.year,
            chart: {
              datasets: {
                label: "Progress",
                backgroundColors: [gaugeProps.color, "light"],
                data: [value, gaugeProps.remainingToFill],
              }
            }
          });
        }

        if (overview.pedStats.overallResGhg) {
          let value = overview.pedStats.overallResGhg;
          let gaugeProps = calculateGaugeChartProps(value);
          setGhgResChartConfig({
            title: "Overall PED/PEN Achievement Rate",
            description: "",
            chart: {
              datasets: {
                label: "Progress",
                backgroundColors: [gaugeProps.color, "light"],
                data: [value, gaugeProps.remainingToFill],
              }
            }
          });
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
                        {pedOverview.ped.heatingDegreeDays !== null && (
                          <Detail label="Heating Degree Days" textValue={pedOverview.ped.heatingDegreeDays + "  days/year"} />
                        )}
                        {pedOverview.ped.coolingDegreeDays !== null && (
                          <Detail label="Cooling Degree Days" textValue={pedOverview.ped.coolingDegreeDays + " days/year"} />
                        )}

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

                    {pedOverview.pedStats.overallSs && (
                      <Grid item xs={10} md={6} lg={4} mt={2}>
                        <GaugeChart
                          icon={{ color: "info", component: "leaderboard" }}
                          title={ssChartConfig.title}
                          subtitle={ssChartConfig.subtitle}
                          description={ssChartConfig.description}
                          chart={ssChartConfig.chart}
                        />
                      </Grid>)}

                    {pedOverview.pedStats.overallGhg && (
                      <Grid item xs={10} md={6} lg={4} mt={2}>
                        <GaugeChart
                          icon={{ color: "dark", component: "leaderboard" }}
                          title={ghgChartConfig.title}
                          subtitle={ghgChartConfig.subtitle}
                          description={ghgChartConfig.description}
                          chart={ghgChartConfig.chart}
                        />
                      </Grid>)}

                    {pedOverview.pedStats.overallResGhg && (
                      <Grid item xs={10} md={6} lg={4} mt={2}>
                        <GaugeChart
                          icon={{ color: "success", component: "leaderboard" }}
                          title={ghgResChartConfig.title}
                          description={ghgResChartConfig.description}
                          chart={ghgResChartConfig.chart}
                        />
                      </Grid>)}

                    <Grid item xs={12}>
                      <DetailsCard title="PED Indicators" description={" "} shadow={true}>
                        {pedOverview.pedStats.overallTasksProgress && (
                          <MDBox bgColor={"grey-100"} p={1} borderRadius="lg" ml={2} mr={2} sx={{ width: { xs: "100%", md: "75%", lg: "50%" } }}>
                            <MDTypography variant="h6" fontWeight="medium" color="text">Overall progress of energy efficiency measures</MDTypography>
                            <Progress value={pedOverview?.pedStats?.overallTasksProgress} />
                            <MDBox sx={{ fontStyle: 'italic' }} >
                              <MDTypography component="div" variant="button" color="text">
                                This is a visualization of the overall progress for all measures defined. To view individual progress for each defined measure, please access the <strong>“Tasks”</strong> section of each category of energy related indicator in the section below.
                              </MDTypography>
                            </MDBox>
                          </MDBox>)}

                        <IndicatorsStats kpis={pedOverview?.pedStats?.kpisByYear} indicatorsStats={pedOverview.indicatorsStats} />
                        <IndicatorsStatsGhg kpis={pedOverview?.pedStats?.kpisByYear} />
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

function calculateGaugeChartProps(value) {
  let color = value > 0 ? "info" : "error";
  var remainingToFill = value < 0 ? 0 : 100 - value;
  remainingToFill = remainingToFill < 0 ? 0 : remainingToFill;

  return { color: color, remainingToFill: remainingToFill };
}

const Progress = ({ value }) => {
  var displayValue = value ? value : 0;
  displayValue = Math.min(displayValue, 100);
  const displayText = value ? parseFloat(value).toFixed(2) : 0;
  const color = displayValue <= 50 ? "error" : "success";
  return (
    <MDBox display="flex" alignItems="center" height="2rem">
      <MDTypography variant="button" color="text" fontWeight="medium">
        {displayText}%
      </MDTypography>
      <MDBox ml={0.5} width="100%" >
        <MDProgress variant="gradient" color={color} value={displayValue} sx={{
          height: "1rem",
          //borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            height: '1rem',
            //borderRadius: 5,
          }
        }} />
      </MDBox>
    </MDBox>
  )
};

export default PedOverview;