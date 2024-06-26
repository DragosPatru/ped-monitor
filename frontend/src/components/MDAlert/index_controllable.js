/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the MDAlert
import MDAlertRoot from "components/MDAlert/MDAlertRoot";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

function MDAlert({ color, isVisible, closeCallback, dismissible, children, ...rest }) {
  const [visible, setVisible] = useState(isVisible);

  const closeAlert = () => {
    setTimeout(() => setVisible(false), 400);
    closeCallback();
  }

  // The base template for the alert
  return (
    <Fade in={isVisible} timeout={300}>
      <MDAlertRoot ownerState={{ color }} {...rest}>
        <MDBox display="flex" alignItems="center" color="white">
          {children}
        </MDBox>
        {dismissible ? (
          <MDAlertCloseIcon onClick={isVisible ? closeAlert : null}>&times;</MDAlertCloseIcon>
        ) : null}
      </MDAlertRoot>
    </Fade>
  );

}

// Setting default values for the props of MDAlert
MDAlert.defaultProps = {
  color: "info",
  dismissible: false,
  closeCallback: () => { console.debug("alert closed"); },
  isVisible: true
};

// Typechecking props of the MDAlert
MDAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  closeCallback: PropTypes.func,
  isVisible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDAlert;
