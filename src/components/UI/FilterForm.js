import CustomInput from "./CustomInput";

import classes from "./styles/FilterForm.module.css";

const FilterForm = ({ filters, onChange, onError }) => {
    const inputs = filters.map((f, index) => {
        return (
          <CustomInput
            label={f.label}
            name={f.name}
            id={f.id}
            type={f.type}
            initialValue={f.initialValue}
            options={f.options}
            validationFn={f.validationFn}
            getInputValue={onChange}
            getError={onError}
            key={`${f.id}/${index}`}
          />
        );
    });

    return (
        <div className={classes["form-container"]}>
            <h3>Filter your data</h3>
            <form className={classes.form}>
                { inputs }
            </form>
        </div>
    );
};

export default FilterForm;