import { useState, useEffect } from "react";

import classes from "../UI/styles/CustomTable.module.css";

const ItemsTable = ({ data }) => {
    const [ rows, setRows ] = useState([]);

    useEffect(() => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            setRows([]);
            return;
        }

        const mappedData = data.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                </tr>
            );
        });

        setRows(mappedData);
    }, [data]);

    return (
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
};

export default ItemsTable;