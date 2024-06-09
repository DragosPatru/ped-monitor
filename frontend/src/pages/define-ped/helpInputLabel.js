import Tooltip from '@mui/material/Tooltip';
import { Icon } from "@mui/material";

export default function HelpInputLabel({label, helpText}) {
    return (
        <div>
            {label}
            <Tooltip title={helpText} placement='right'>
                <Icon>help</Icon>
            </Tooltip>
        </div>
    );
}