import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


function Detail({ label, id, textValue, labelGrid, textValueGrid, padding }) {
    const hasId = id.length > 0;
    return (
        <Grid container>
            <Grid item xs={labelGrid}>
                <MDTypography variant="button" fontWeight="regular">
                    {label}
                </MDTypography>
            </Grid>
            <Grid item xs={textValueGrid}>
                <MDTypography variant="button" fontWeight="regular" color="text">
                    {textValue}
                </MDTypography>
            </Grid>
        </Grid>
    );
}

// default values
Detail.defaultProps = {
    labelGrid: 9,
    textValueGrid: 3,
    id: ""
};

// Typechecking
Detail.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    textValue: PropTypes.string.isRequired,
    labelGrid: PropTypes.number.isRequired,
    textValueGrid: PropTypes.number.isRequired
};

export default Detail;
