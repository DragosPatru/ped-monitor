import { useState } from "react";
// Material Kit 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Collapse from '@mui/material/Collapse';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function CollapsableRow({ title, titleVariant, titleColor, titleFontWeight, rightMostText, description, descriptionVariant, descriptionFontSize, children }) {
    const [expanded, setExpanded] = useState(false);

    const _titleVariant = titleVariant ? titleVariant : "h6";
    const _titleColor = titleColor ? titleColor : "text";
    const _descriptionVariant = descriptionVariant ? descriptionVariant : "body2";
    const _descriptionSize = descriptionFontSize ? descriptionFontSize : "1rem";
    const _titleFontWeight = titleFontWeight ? titleFontWeight : "bold";

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    //sx={{ borderLeft: "0.0625rem solid rgb(222, 226, 230);" }}
    const rightMostTextBox = rightMostText ? (
        <MDBox px={2} py={1}>
            <MDTypography variant={_titleVariant} fontWeight="bold" color="text">
                {rightMostText}
            </MDTypography>
        </MDBox>) : ("");

    return (
        <MDBox sx={{ cursor: "pointer" }}>
            <MDBox onClick={handleExpandClick} mt={2} pb={1} pt={1} display="flex" sx={{ justifyContent: "space-between", alignItems: "center", borderBottom: "0.0625rem solid rgb(222, 226, 230);" }}>
                <MDTypography variant={_titleVariant} fontWeight={_titleFontWeight} color={_titleColor}>
                    {title}
                </MDTypography>

                <MDBox display="flex" flexDirection="row">
                    {rightMostTextBox}
                    <ExpandMore
                        expand={expanded}
                        aria-expanded={expanded}
                        aria-label="show more"
                        color={_titleColor}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </MDBox>
            </MDBox>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <MDBox width="100%" pb={2} pt={2} >
                    <MDTypography color="text" variant={_descriptionVariant}
                        fontSize={_descriptionSize} lineHeight="1.5" sx={{ whiteSpace: "pre-line" }} >
                        {description}
                    </MDTypography>
                    {/* Children elements */}
                    {children}
                </MDBox>
            </Collapse >

        </MDBox >
    );

}