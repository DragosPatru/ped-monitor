import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "components/MDButton"; // Adjust the import path as needed
import Icon from "@mui/material/Icon";
import FormHelperText from '@mui/material/FormHelperText';

// DropdownProps might include any props you want to pass to customize your dropdown, 
// such as the button label or the menu items.
const Dropdown = ({ name, label, items, icon, onMenuItemClick, valid = true }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isValid, setIsValid] = useState(valid);
  const [selectedItem, setSelectedItem] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    if (!item.title) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => () => {
    setSelectedItem(item);
    onMenuItemClick(item);
    handleClose(item);
  };

  const buttonLabel = selectedItem.title ? selectedItem.title : label;

  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
    transform: open ? "rotate(180deg)" : "rotate(0)",
  };

  return (
    <>
      <MDButton variant="outlined" color="secondary" onClick={handleClick}>
        {buttonLabel} <Icon sx={iconStyles}>{icon || "expand_more"}</Icon>
      </MDButton>
      <Menu name={name} anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ style: { maxHeight: "15rem", }, }}>
        {items.map((item, index) => (
          <MenuItem key={`${item.key}`} onClick={handleMenuItemClick(item)}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      {!isValid && <FormHelperText error>Invalid value</FormHelperText>}
    </>
  );
};

export default Dropdown;