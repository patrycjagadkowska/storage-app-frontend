import { useState, useEffect } from "react";

import classes from "../UI/styles/CustomTable.module.css";

const SupplyItemsList = ({ items, categories }) => {
    const [ itemsRows, setItemsRows ] = useState([]);

    useEffect(() => {
        if (!items || !Array.isArray(items) || items.length <= 0) {
            setItemsRows([]);
            return;
        }

        const mappedRows = items.map((i) => {
            const categoryName = categories.find((c) => c.id === i.CategoryId).name;
            return (
                <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{categoryName}</td>
                    <td>{i.SupplyItem.quantity}</td>
                    <td>{i.SupplyItem.purchasePrice}</td>
                </tr>
            );
        });
        setItemsRows(mappedRows);
    }, [items, categories]);

    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {itemsRows}
            </tbody>
        </table>
    )
};

export default SupplyItemsList;