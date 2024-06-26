import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Icon } from '@mui/material';
import { styled } from '@mui/system';
import { tooltipClasses } from '@mui/material/Tooltip';
import MDTypography from 'components/MDTypography';


const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '20rem',
    textAlign: 'justify',
  },
});

export default function HelpInputLabelLarge({ label, helpText, warning=false}) {
  const icon = warning ? "error_outline_outlined" : "help";
  const color = warning ? "warning" : "";
  return (
    <div>
      {label}
      <StyledTooltip title={<MDTypography variant="button" color="white" fontWeight="light" dangerouslySetInnerHTML={{ __html: helpText }}></MDTypography>} placement='right'>
        <Icon color={color}>{icon}</Icon>
      </StyledTooltip>
    </div>
  );
}