import { useState, useEffect } from "react";

import FilterForm from "../UI/FilterForm";
import { validateSelect } from "../../constants/validationFns";

const StockList = ({ categories, items, onChangeHandler, onErrorHandler }) => {
    const [ records, setRecords ] = useState([]);

    console.log(items);

    useEffect(() => {
        if (items && Array.isArray(items)) {
            const mappedItems = items.map((i, index) => {
                return <tr key={`${i.name}/${index}`}>
                    <td>{i.name}</td>
                    <td>{i.quantity}</td>
                </tr>
            });
            setRecords(mappedItems);
        } else {
            setRecords([]);
        }
    }, [items])

    const categoriesOptions = (categories && categories.map((c) => c.name)) || [];

    const filters = [
        {
            name: "category",
            label: "Category",
            id: "category",
            initialValue: "",
            validationFn: { validationFn: validateSelect, data: categoriesOptions},
            options: categoriesOptions
        }
    ];

    return (
      <>
        <FilterForm
          filters={filters}
          onChange={onChangeHandler}
          onError={onErrorHandler}
        />
        <h3>Your stock</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                { records }
            </tbody>
        </table>
        {records.length === 0 && <p>No records found.</p>}
      </>
    );
};

export default StockList;