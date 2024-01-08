import { useState } from "react";

export const useInput = ( initialValue, { validationFn, data }) => {
    const [ value, setValue ] = useState(initialValue);
    const [ error, setError ] = useState(null);

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setValue(value);

        const validationError = validationFn(value, data);
        if (validationError) {
            setError(validationError);
        } else {
            setError(null);
        }
    };

    return { value, error, onChangeHandler };
};