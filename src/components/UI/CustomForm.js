import { useEffect, useState, useCallback } from "react";

import CustomInput from "./CustomInput";
import CustomButton from "../UI/CustomButton";

import classes from "./styles/CustomForm.module.css";

const CustomForm = ({ inputs, onSubmit, button }) => {
    const [ customInputs, setCustomInputs ] = useState([]);
    const [ formValues, setFormValues ] = useState({});
    const [ formErrors, setFormErrors ] = useState({});

    const getInputValue = useCallback(({ name, value }) => {
        setFormValues((values) => {
            const copiedValues = { ...values };
            copiedValues[name] = value;
            return copiedValues;
        });
    }, [setFormValues]);

    const getError = useCallback(({ name, error }) => {
        setFormErrors((errors) => {
            const copiedValues = { ...errors };
            copiedValues[name] = error ? true : false;
            return copiedValues;
        });
    }, [setFormErrors]);

    const submitHandler = (event) => {
        event.preventDefault();
        const errors = Object.values(formErrors);
        const hasError = errors.find(value => value === true);
        if (hasError) {
            console.log("I will not submit");
            return;
        }
        console.log("Submitted!");
        onSubmit(formValues);
    };
   

    useEffect(() => {
        let mappedInputs;
        if (inputs && Array.isArray(inputs) && inputs.length > 0) {
            mappedInputs = inputs.map((input) => {
                const { label, id, name, type, initialValue, validationFn, placeholder } = input;
                let fn;
                //pass additional data from state to validationFn
                if (name === "repeat-pass") {
                    fn = { validationFn, data: formValues.password };
                } else {
                    fn = {validationFn};
                }
                return (
                  <CustomInput
                    label={label}
                    id={id}
                    name={name}
                    type={type}
                    key={id}
                    initialValue={initialValue}
                    validationFn={fn}
                    getInputValue={getInputValue}
                    getError={getError}
                    placeholder={placeholder}
                  />
                );
            });
        } else {
            mappedInputs = [];
        }
        setCustomInputs(mappedInputs);
    }, [inputs, getInputValue, getError, formValues.password]);

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            { Array.isArray(customInputs) && customInputs.length > 0 && customInputs }
            <CustomButton>{ button }</CustomButton>
        </form>
    );
};

export default CustomForm;