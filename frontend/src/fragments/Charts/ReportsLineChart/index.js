import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ReportsLineChart({ color, title, titleVariant, italicText, description, date, chart, shadow, bgColor }) {
  //const { data, options } = configs(chart.labels || [], chart.datasets || {});
  const chartConfig = useMemo(() => configs(chart.labels || [], chart.datasets || {}), [chart.labels, chart.datasets]);
  const fontStyle = italicText === true ? 'italic' : 'normal';

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }} >
      <MDBox padding="1rem" bgColor={bgColor}>

        <MDBox
          variant="gradient"
          bgColor={color}
          borderRadius="lg"
          coloredShadow={color}

          py={2}
          pr={0.5}
          mt={-5}
          height="12.5rem"
        >
          <Line data={chartConfig.data} options={chartConfig.options} redraw />
        </MDBox>

        <MDBox pt={2} pb={0} px={0} sx={{ fontStyle: fontStyle }}>
          <MDTypography variant={titleVariant} textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
          {/* <Divider /> */}
          {date && (
            <MDBox display="flex" alignItems="center">
              <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
                <Icon>schedule</Icon>
              </MDTypography>

              <MDTypography variant="button" color="text" fontWeight="light">
                {date}
              </MDTypography>
            </MDBox>)}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
  color: "info",
  description: "",
  titleVariant: "h6",
  italicText: false,
  bgColor: ""
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;
