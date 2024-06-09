import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


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
import DeleteModal from "./deleteModal";

function PedsOverview() {

  const [peds, setPeds] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [valueToProcess, setValueToProcess] = useState(null);

  const [errorSB, setErrorSB] = useState(false);

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

  const [backdropOpen, setBackdropOpen] = useState(true);
  const handleOpenBackdrop = () => {
    setBackdropOpen(true);
  };
  const handleCloseBackdrop = () => {
    setBackdropOpen(false);
  };

  const alertContent = () => (
    <MDTypography variant="body2" color="white">
      There is no PED defined at the moment. You can define one using the dedicated page.
    </MDTypography>
  );

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = (value) => {
    setValueToProcess(value);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = (needReload = false) => {
    setDeleteModalOpen(false);
    setValueToProcess(null);
    if (needReload === true) {
      window.location.reload(false);
    }
  };

  useEffect(() => {
    fetchPeds();
  }, [noDataFound]);

  const fetchPeds = async () => {
    handleOpenBackdrop();
    try {
      const data = await PedService.getAll();
      if (data?.length === 0) {
        setNoDataFound(true);

      } else {
        setPeds(data);
      }

    } catch (error) {
      openErrorSB();

    } finally {
      handleCloseBackdrop();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SimpleBackdrop open={backdropOpen} handleClose={handleCloseBackdrop} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {peds.map((ped) => (
            <Grid item xs={12} md={6} lg={4} key={ped.id}>
              <DefaultPedCard
                icon="account_balance"
                title={ped.name}
                description={ped.description}
                action={{
                  type: "internal",
                  route: "/peds/" + ped.id,
                  color: "info",
                  label: "OPEN",
                }}
                deleteAction={() => openDeleteModal(ped)}
              />
            </Grid>
          ))}

          <DeleteModal ped={valueToProcess} isOpen={deleteModalOpen} onClose={closeDeleteModal} />

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


      <MDBox width="100%" display="flex" py={0}>
          <Grid container justifyContent="center">
          <Grid item xs={12} mt={1} mb={0}>
            <MDBox opacity={0.6}>
              <Divider />
            </MDBox>
            <MDBox lineHeight={1} pr={2} justifyContent="space-between">
              <MDTypography variant="caption" color="text" fontWeight="light" textAlign="justify">
                This project has received funding in the framework of the PED Program, which is implemented by
                the Joint Programming Initiative Urban Europe and SET Plan Action 3.2.
                The project is supported by the Austrian Ministry of Climate Action,
                Environment, Energy, Mobility, Innovation, and Technology (BMK) and the RVO
                (the Netherlands Enterprise Agency), reference number ERANETPED-02767306.
                This work was supported by a grant of the Ministry of Research,
                Innovation and Digitization CNCS/CCCDI – UEFISCDI, project number PED-JPI-SIMPLY POSITIVE,
                contracts number 325/2022 and 326/2022, within PNCDI III and by a grant of the Ministry
                of Education and Merit - Department for Higher Education and Research, project number
                PED_00042, from the Fund for Investment in Scientific and Technological Research
                (FIRST/FAR) and/or Special Accounting Account no. 5944.
              </MDTypography>
            </MDBox>

            <MDBox mt={1} pr={2} display="flex">
              <MDTypography variant="caption" color="text" fontWeight="light">For more information please access: &nbsp;</MDTypography>
              <MDTypography component="a" variant="caption" color="info" fontWeight="light" target="_blank" rel="noreferrer" href="http://simplypositive.eu/">
                http://simplypositive.eu/
              </MDTypography>
            </MDBox>
          </Grid>
          </Grid>
          </MDBox>
    </DashboardLayout>
  );
}

export default PedsOverview;
