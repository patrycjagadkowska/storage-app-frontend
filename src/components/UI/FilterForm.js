import CustomInput from "./CustomInput";

const FilterForm = ({ filters, onChange, onError }) => {
    const inputs = filters.map((f, index) => {
        return (
          <CustomInput
            label={f.label}
            name={f.name}
            id={f.id}
            type="select"
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
        <div>
            <h3>Filter your data</h3>
            <form>
                { inputs }
            </form>
        </div>
    );
};

export default FilterForm;