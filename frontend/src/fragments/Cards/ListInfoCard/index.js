// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ListInfoCard({ title, description, info, shadow }) {
  const labels = [];
  const values = [];
  const hasDescription = description.length > 0;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
      labels.push(el);
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    
      <Grid container>
      <Grid item xs={9}>
      <MDTypography variant="button" fontWeight="bold" >{/*  textTransform="capitalize" */}
        {label}
      </MDTypography>
      </Grid>
      <Grid item xs={3}>
      <MDTypography variant="button" fontWeight="regular" color="text">
        {values[key]}
      </MDTypography>
      </Grid>
      </Grid>
    
  ));

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
          {renderItems}
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ListInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ListInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  shadow: PropTypes.bool,
};

export default ListInfoCard;
