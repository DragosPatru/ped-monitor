// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DetailsCard({ title, description, children, shadow }) {
  const hasDescription = description.length > 0;

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {hasDescription ? (
          <>
          <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.6}>
          <Divider />
        </MDBox></>
        ) : (<></>)}
        
        <MDBox>
        <Grid container>
          {children}
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
DetailsCard.defaultProps = {
  shadow: false,
};

// Typechecking props for the ProfileInfoCard
DetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  shadow: PropTypes.bool,
};

export default DetailsCard;
