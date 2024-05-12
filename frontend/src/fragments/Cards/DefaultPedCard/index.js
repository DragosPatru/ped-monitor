// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function DefaultPedCard({ color, icon, title, description, action, deleteAction }) {
	return (
		<Card>
			<MDBox display="flex" pt={1} px={2}>
				<MDBox
					variant="gradient"
					bgColor={color}
					color={color === "light" ? "dark" : "white"}
					coloredShadow={color}
					borderRadius="xl"
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="4rem"
					height="4rem"
					mt={-3}
				>
					<Icon fontSize="medium" color="inherit">
						{icon}
					</Icon>
				</MDBox>
				<MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
					<MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
						{title}
					</MDTypography>
				</MDBox>
			</MDBox>
			<MDBox pb={2} px={2} pt={1} textAlign="justify" lineHeight={1.25}>

				{description && (
					<MDTypography variant="caption" color="text" fontWeight="regular">
						{description}
					</MDTypography>
				)}

				<Divider />
				<MDBox display="flex" justifyContent="space-between" alignItems="center">
					<MDButton
						component={Link}
						to={action.route}
						variant="outlined"
						color={action.color}
						size="small"
					>
						<Icon>open_in_new</Icon>&nbsp;{action.label}
					</MDButton>
					
					{deleteAction && (
					<MDBox>
						<MDButton variant="outlined" color="error" onClick={deleteAction} size="small" >
							<Icon>delete_outline_rounded</Icon>&nbsp;delete
						</MDButton>
					</MDBox>)}
				</MDBox>

			</MDBox>
		</Card>
	);
}

// Setting default values for the props of DefaultInfoCard
DefaultPedCard.defaultProps = {
	color: "info",
	title: "",
	description: "",
};

// Typechecking props for the DefaultPedCard
DefaultPedCard.propTypes = {
	color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
	icon: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	action: PropTypes.shape({
		type: PropTypes.oneOf(["external", "internal"]),
		route: PropTypes.string.isRequired,
		color: PropTypes.oneOf([
			"primary",
			"secondary",
			"info",
			"success",
			"warning",
			"error",
			"light",
			"dark",
			"white",
		]).isRequired,
	}).isRequired,
};

export default DefaultPedCard;
