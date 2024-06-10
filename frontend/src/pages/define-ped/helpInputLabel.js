import Tooltip from '@mui/material/Tooltip';
import { Icon } from '@mui/material';
import { styled } from '@mui/system';
import { tooltipClasses } from '@mui/material/Tooltip';
import MDTypography from 'components/MDTypography';


const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        textAlign: 'justify',
    },
});

export default function HelpInputLabel({ label, helpText }) {
    return (
        <div>
            {label}
            <StyledTooltip title={<MDTypography variant="button" color="white" fontWeight="light" dangerouslySetInnerHTML={{ __html: helpText }}></MDTypography>} placement='right'>
                <Icon>help</Icon>
            </StyledTooltip>
        </div>
    );
}