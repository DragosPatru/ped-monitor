import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// GaugeChart configurations
import configs from "fragments/Charts/GaugeChart/configs";

import colors from "assets/theme/base/colors";
const { dark } = colors;

ChartJS.register(ArcElement, Tooltip, Legend);

// custom plugin
const gaugeChartText = {
  id: 'gaugeChartText',
  afterDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart;
    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.fillStyle = dark.main;
    ctx.textAllign = 'center';
    ctx.font = '2rem sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(data.datasets[0].data[0] + '%', xCoor, yCoor);
  }
};

function GaugeChart({ icon, title, subtitle, description, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {}, chart.cutout);

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <MDBox display="flex" px={1} pb={1} pt={1}>
          {icon.component && (
            <MDBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "dark"}
              variant="gradient"
              coloredShadow={icon.color || "dark"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
              flexShrink={0}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </MDBox>
          )}
          <MDBox mt={icon.component ? -2 : 0}>
            {title && <MDTypography variant="h6">{title}</MDTypography>}
          </MDBox>
        </MDBox>
      ) : null}
      <MDBox sx={{ fontStyle: 'italic' }}>
        {subtitle}  
      </MDBox>
      {useMemo(
        () => (
          <MDBox height={height} pl={1}>
            <Doughnut data={data} options={options} plugins={[gaugeChartText]} redraw />
          </MDBox>
        ),
        [chart, height]
      )}
      <MDBox mb={0}>
        <MDTypography textAlign="center" component="div" variant="button" color="text">
          {description}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of GaugeChart
GaugeChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "12.125rem",
};

// Typechecking props for the GaugeChart
GaugeChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark"
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default GaugeChart;
