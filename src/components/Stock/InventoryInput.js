import { useEffect } from "react";

import { useInput } from "../../hooks/useInput";
import { validateInventoryQuantity } from "../../constants/validationFns";

const InventoryInput = ({ inputData, getValue }) => {
    const { name, id, label, oldValue } = inputData || {};
    const { value, error, onChangeHandler } = useInput(oldValue, {
      validationFn: validateInventoryQuantity,
    });

    useEffect(() => {
        getValue({ itemId: id, value });
    }, [id, value, getValue]);

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          name={name}
          id={id}
          label={label}
          placeholder={oldValue}
          value={value}
          onChange={onChangeHandler}
        />
        <span>{error}</span>
      </div>
    );
};

export default InventoryInput;