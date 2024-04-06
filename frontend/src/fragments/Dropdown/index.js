import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "components/MDButton"; // Adjust the import path as needed
import Icon from "@mui/material/Icon";

// DropdownProps might include any props you want to pass to customize your dropdown, 
// such as the button label or the menu items.
const Dropdown = ({ label, items, icon, onMenuItemClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => () => {
    onMenuItemClick(item);
    handleClose();
  };

  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
    transform: open ? "rotate(180deg)" : "rotate(0)",
  };

  return (
    <>
      <MDButton variant="outlined" color="info" onClick={handleClick}>
        {label} <Icon sx={iconStyles}>{icon || "expand_more"}</Icon>
      </MDButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item, index) => (
          <MenuItem key={`${item.key}`} onClick={handleMenuItemClick(item)}>
            {item.displayName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;