import { useEffect, useState } from "react";

import CustomInput from "./CustomInput";

import classes from "./styles/CustomForm.module.css";

const CustomForm = ({ inputs, onSubmit }) => {
    const [ customInputs, setCustomInputs ] = useState([]);

    useEffect(() => {
        let mappedInputs;
        if (inputs && Array.isArray(inputs) && inputs.length > 0) {
            mappedInputs = inputs.map((input) => {
                const { label, id, name, type, onChange, value, error } = input;
                return (
                  <CustomInput
                    label={label}
                    id={id}
                    name={name}
                    type={type}
                    onChange={onChange}
                    value={value}
                    error={error}
                    key={id}
                  />
                );
            });
        } else {
            mappedInputs = [];
        }
        setCustomInputs(mappedInputs);
    }, [inputs]);

    return (
        <form className={classes.form} onSubmit={onSubmit}>
            { Array.isArray(customInputs) && customInputs.length > 0 && customInputs }
        </form>
    );
};

export default CustomForm;