import { useState } from "react";

import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import dataSourceFactorsFET from "constants/data-source-factors-fet";

export const valuesTableRows = (values) => {
    const rows = values.length ? (values.map(value => ({
        id: value.id,
        dataSource: dataSourceFactorsFET.get(value.dataSourceCode) || value.dataSourceCode,
        amount: value.amount,
        created: value.createdAt,
        action: value,
    }))) : [];

    return rows;
};

export const valuesTableColumns = [
    { Header: "dataSource", accessor: "dataSource", width: "45%", align: "left" },
    { Header: "amount (kWh/a)", accessor: "amount", align: "left" },
    { Header: "created", accessor: "created", align: "left" },
    {
        Header: "action", accessor: "action", align: "center", Cell: ({ cell: { value } }) => (
            <Action value={value}></Action>
        )
    },
];

const Action = ({ value }) => {
    const [menu, setMenu] = useState(null);
    const menuVisible = value.allowUpdates;
    const opacity = menuVisible ? 1 : 0;

    const openMenu = ({ currentTarget }) => {
        if (menuVisible === false) {
            return;
        }
        setMenu(currentTarget);
    }

    const handleRemoveClick = () => {
        closeMenu();
        value.onRemove();
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