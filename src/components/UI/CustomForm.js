import { useEffect, useState, useCallback } from "react";

import CustomInput from "./CustomInput";
import CustomButton from "../UI/CustomButton";

import classes from "./styles/CustomForm.module.css";

const CustomForm = ({ inputs, onSubmit, button, getFormValues, formError }) => {
  const [customInputs, setCustomInputs] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (getFormValues) {
      getFormValues(formValues);
    }
  }, [formValues, getFormValues]);

  const getInputValue = useCallback(
    ({ name, value }) => {
      setFormValues((values) => {
        const copiedValues = { ...values };
        copiedValues[name] = value;
        return copiedValues;
      });
    },
    [setFormValues]
  );

  const getError = useCallback(
    ({ name, error }) => {
      setFormErrors((errors) => {
        const copiedValues = { ...errors };
        copiedValues[name] = error ? true : false;
        return copiedValues;
      });
    },
    [setFormErrors]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = Object.values(formErrors);
    const hasError = errors.find((value) => value === true);
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
        const {
          label,
          id,
          name,
          type,
          initialValue,
          validationFn,
          placeholder,
          options,
          addOption,
        } = input;
        let fn;
        //pass additional data from state or props to validationFn
        if (name === "repeat-pass") {
          fn = { validationFn, data: formValues.password };
        } else if (name === "repeatPass") {
          fn = { validationFn, data: formValues.newPass };
        } else if (type === "select") {
          fn = { validationFn, data: options };
        } else {
          fn = { validationFn };
        }
        return (
          <div className={classes["form__row"]} key={id}>
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
              options={options}
            />
            {addOption && (
              <CustomButton type="button" onClick={addOption.handler}>
                {addOption.icon} <span>{addOption.button}</span>
              </CustomButton>
            )}
          </div>
        );
      });
    } else {
      mappedInputs = [];
    }
    setCustomInputs(mappedInputs);
  }, [
    inputs,
    getInputValue,
    getError,
    formValues.password,
    formValues.newPass,
  ]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {Array.isArray(customInputs) && customInputs.length > 0 && customInputs}
      {formError && <p>{formError}</p>}
      <CustomButton type="submit">{button}</CustomButton>
    </form>
  );
};

export default CustomForm;