import { useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MDBadge from "components/MDBadge";

import MDProgress from "components/MDProgress";

export const tasksTableRows = (tasks) => {
    const rows = tasks.length ? (tasks.map(task => ({
        id: task.id,
        name: task.name,
        status: task.status,
        created: task.creationDate,
        deadline: task.deadline,
        remainingBudget: task.remainingBudgetPercentage,
        plannedBudget: task.plannedBudget,
        action: task,
    }))) : [];

    return rows;
};

export const tasksTableColumns = [
    { Header: "name", accessor: "name", width: "45%", align: "left" },
    {
        Header: "status", accessor: "status", align: "center", Cell: ({ cell: { value } }) => (
            <Status value={value}></Status>
        )
    },
    { Header: "created", accessor: "created", align: "left" },
    { Header: "deadline", accessor: "deadline", align: "left" },
    { Header: "Planned Budget (EUR)", accessor: "plannedBudget", align: "left" },
    {
        Header: "Remaining budget", accessor: "remainingBudget", align: "left", Cell: ({ cell: { value } }) => (
            <Progress value={value}></Progress>
        )
    },
    {
        Header: "action", accessor: "action", align: "center", Cell: ({ cell: { value } }) => (
            <Action task={value}></Action>
        )
    },
];


const Status = ({ value }) => {
    const color = value === "OPEN" ? "info" : "success";
    return (
        <MDBox ml={-1}>
            <MDBadge badgeContent={value} color={color} variant="gradient" size="sm" />
        </MDBox>
    )
};

const Progress = ({ value }) => {
    const displayValue = value ? value : 0;
    const color = displayValue <= 40 ? "error" : "success";
    return (
        <MDBox display="flex" alignItems="center">
            <MDTypography variant="caption" color="text" fontWeight="medium">
                {displayValue}%
            </MDTypography>
            <MDBox ml={0.5} width="9rem">
                <MDProgress variant="gradient" color={color} value={displayValue} />
            </MDBox>
        </MDBox>
    )
};

const Action = ({ task }) => {
    const [menu, setMenu] = useState(null);
    const menuVisible = task.status === "OPEN" ? true : false;
    const opacity = menuVisible ? 1 : 0;

    const openMenu = ({ currentTarget }) => {
        if (menuVisible === false) {
            return;
        }
        setMenu(currentTarget);
    }

    const handleRemoveClick = () => {
        closeMenu();
        task.onRemove();
    };

    const handleEditClick = () => {
        closeMenu();
        task.onEdit();
    };

    const closeMenu = () => setMenu(null);

    const renderMenu = (
        <Menu
            id="simple-menu"
            anchorEl={menu}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(menu)}
            onClose={closeMenu}
        >
            {/* <MenuItem onClick={closeMenu}>Record Expense</MenuItem>
          <MenuItem onClick={closeMenu}>Update Saved Energy</MenuItem> */}
            <MenuItem onClick={handleEditClick}>Edit</MenuItem>
            <MenuItem onClick={handleRemoveClick}>Remove</MenuItem>
        </Menu>
    );

    return (
        <>
            <MDBox color="text" px={2} opacity={opacity}>
                <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu} >
                    more_vert
                </Icon>
            </MDBox>

            {renderMenu}
        </>
    )
};