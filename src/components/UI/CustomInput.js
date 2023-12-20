import { useState } from "react";

import classes from "./styles/CustomInput.module.css";

const CustomInput = ({ label, id, name, type, onChange, value, error }) => {
    const [ focused, setFocused ] = useState(false);

    const focusInput = () => {
        setFocused(true);
    };

    const blurInput = () => {
        setFocused(false);
    };

    return (
      <div className={`${classes["input-group"]} ${focused ? classes.focused : ""}`}>
        <label className={focused ? classes.focused : ""} htmlFor={id}>{label}</label>
        <input
          type={type}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          onFocus={focusInput}
          onBlur={blurInput}
        />
        {error && <p className={classes.error}>{error}</p>}
      </div>
    );
};

export default CustomInput;