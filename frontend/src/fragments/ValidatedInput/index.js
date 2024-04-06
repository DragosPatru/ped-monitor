import React, { useState } from 'react'
import MDInput from "components/MDInput";

/** 
 * validationRegex: use new RegExp('regex here'); 
**/
export default function ValidatedInput({ validationRegex, changeResultCallback, ...rest }) {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [dirty, setDirty] = useState(false);

    const handleChange = (event) => {
        const val = event.target.value;
        setValue(val);

        if (validationRegex.test(val)) {
            setIsValid(true);
            changeResultCallback(val, true);
        } else {
            setIsValid(false);
            changeResultCallback(val, false);
        }
    }

    return (
        <>
            <MDInput
                variant="standard"
                InputLabelProps={{ shrink: true, style: { fontSize: "1.15rem" } }}
                inputProps={{ style: { fontSize: "1rem" } }}
                fullWidth
                fontSize="1.5rem"
                value={value}
                onChange={(e) => handleChange(e)}
                error={dirty && isValid === false}
                onBlur={() => setDirty(true)}
                {...rest}
            />
        </>
    );
}