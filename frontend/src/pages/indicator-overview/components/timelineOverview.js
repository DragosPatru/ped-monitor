// @mui material components
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "fragments/Timeline/TimelineItem";

function TimelineOverview({ startDate, endDate }) {
  const daysLeft = diffInDays(startDate, endDate);
  
  return (
    <Card sx={{ height: "100%" }}>
      <Grid container>
      <MDBox pt={3} px={3}>    
        <MDTypography variant="h6" fontWeight="medium">
          Timeline overview
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>access_time</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {daysLeft}
            </MDTypography>{" "}
            days left
          </MDTypography>
        </MDBox>
        
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="Creation Date"
          dateTime={formatDate(startDate)}
        />
        <TimelineItem
          color="error"
          icon="notifications"
          title="Target Date"
          dateTime={formatDate(endDate)}
          lastItem
        />
      </MDBox>
      </Grid>
    </Card>
  );
}

function diffInDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate the difference in milliseconds
  const difference = end - start;
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

function formatDate(dateString) {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(dateString);

  const day = date.getDate(); // Returns the day of the month (from 1 to 31)
  const monthIndex = date.getMonth(); // Returns the month (from 0 to 11)
  const year = date.getFullYear(); // Returns the year

  return `${day < 10 ? '0' + day : day} ${months[monthIndex]} ${year}`;
}


export default TimelineOverview;
