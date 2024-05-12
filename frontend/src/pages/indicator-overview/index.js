import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// @mui material components
import Grid from "@mui/material/Grid";
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

import IndicatorConfigModal from "./components/indicatorConfigModal";
import TimelineOverview from "./components/timelineOverview";

// service
import IndicatorService from "services/IndicatorService";
import indicatorsMap from 'constants/indicators-map';
import TasksTable from "./components/tasks/tasksTable";
import ValuesTable from "./components/values/valuesTable";


function IndicatorOverview() {
  const { indicatorId } = useParams();
  const [indicatorOverview, setIndicatorOverview] = useState({dataSourceCodes:[]});
  const [title, setTitle] = useState("");

  const [timelineDates, setTimelineDates] = useState({ creationDate: null, endDate: null });

  // Edit Modal
  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = (needReload = false) => {
    setEditModalOpen(false);
    if (needReload === true) {
      window.location.reload(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      openBackdrop();
      try {
        const overview = await IndicatorService.getOverview(indicatorId);
        setIndicatorOverview(overview);
        setTitle(indicatorsMap.get(overview.indicator.code).title);

        if (overview.configured === true) {
          setEditButtonVisible(false);
          setTimelineDates({
            creationDate: overview.indicator.createdAt, endDate: overview.indicator.endOfTargetYear
          });

        } else {
          openNotConfiguredWarningSB();
        }


      } catch (error) {
        console.error('Error fetching Indicator data:', error);
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
  }, [indicatorId]);


  //
  // Errors & Loading State
  //
  const [alertSB, setAlertSB] = useState({ open: false, message: "", color: "error", title: "Error" });
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

  const openErrorSB = () => setAlertSB({ open: true, message: "Could not retrieve data from the server !", color: "error", title: "Error" });
  const openNotConfiguredWarningSB = () => setAlertSB({ open: true, message: "Indicator is not configured. Please configure it!", color: "warning", title: "Warning" });
  const closeAlertSB = () => setAlertSB({ open: false, message: "", color: "error", title: "" });
  const renderErrorSB = (
    <MDSnackbar
      color={alertSB.color}
      icon="warning"
      title={alertSB.title}
      content={alertSB.message}
      dateTime="1 second(s) ago"
      open={alertSB.open}
      onClose={closeAlertSB}
      close={closeAlertSB}
      bgWhite
    />
  );

  const header = (
    <MDBox mx={2} mt={-3} py={2} px={2} variant="gradient"
      bgColor="info" borderRadius="lg" coloredShadow="info"
      display="flex" justifyContent="space-between" alignItems="center">
      <MDBox variant="contained" color="light" borderRadius="xl" display="flex"
        alignItems="center" pl={1}>
        <Icon fontSize="large" color="inherit">
          account_balance
        </Icon>
        <MDTypography variant="h5" color="light" ml={1}> {/* Added marginLeft */}
          {title}
        </MDTypography>
      </MDBox>

      {editButtonVisible && (
        <MDButton variant="text" color="light" size="large" onClick={openEditModal}>
          <Icon>settings</Icon>&nbsp;configure
        </MDButton>)}
    </MDBox>
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

                {header}

                <IndicatorConfigModal indicatorId={indicatorId} minTargetYear={indicatorOverview.minTargetYear}
                  maxTargetYear={indicatorOverview.maxTargetYear} isOpen={editModalOpen} onClose={closeEditModal} />

                {!editButtonVisible && (
                  <MDBox mt={3} mb={3} p={2}>
                    <Grid container spacing={1}>

                      <Grid item xs={12}>
                        <TimelineOverview startDate={timelineDates.creationDate} endDate={timelineDates.endDate} />
                      </Grid>

                      <Grid item xs={12} mt={4}>
                        <ValuesTable indicatorId={indicatorId} dataSourceCodes={indicatorOverview.dataSourceCodes} allowDataChanges={indicatorOverview.allowDataChanges} onError={openErrorSB} onAsyncOp={openBackdrop} onAsyncOpEnd={closeBackdrop}></ValuesTable>
                      </Grid>

                      <Grid item xs={12} mt={4}>
                        <TasksTable indicatorId={indicatorId} onError={openErrorSB} onAsyncOp={openBackdrop} onAsyncOpEnd={closeBackdrop}></TasksTable>
                      </Grid>

                    </Grid>
                  </MDBox>
                )}

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