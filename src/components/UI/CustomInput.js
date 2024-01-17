import { useEffect, useState } from "react";

import { useInput } from "../../hooks/useInput";

import classes from "./styles/CustomInput.module.css";

const CustomInput = ({ label, id, name, type, initialValue, validationFn, getInputValue, getError, placeholder }) => {
    const [ focused, setFocused ] = useState(false);
    const { value, error, onChangeHandler } = useInput(initialValue, validationFn);

    const focusInput = () => {
        setFocused(true);
    };

    const blurInput = () => {
        setFocused(false);
    };

    useEffect(() => {
        getInputValue({name, value});
        getError({name, error});
    }, [value, error, getInputValue, getError, name]);

    return (
      <div className={`${classes["input-group"]} ${focused ? classes.focused : ""}`}>
        <label className={focused ? classes.focused : ""} htmlFor={id}>{label}</label>
        <input
          type={type}
          name={name}
          id={id}
          onChange={onChangeHandler}
          value={value}
          onFocus={focusInput}
          onBlur={blurInput}
          placeholder={placeholder}
        />
        {error && <p className={classes.error}>{error}</p>}
      </div>
    );
};

export default CustomInput;