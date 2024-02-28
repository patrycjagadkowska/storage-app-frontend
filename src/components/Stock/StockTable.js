import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import CustomButton from "../UI/CustomButton";

import classes from "./Stock.module.css";

const StockTable = ({ items, categoryName, openEditItemModal }) => {
    const [ records, setRecords ] = useState([]);

    useEffect(() => {
        if (!items || !Array.isArray(items) || items.length === 0) {
            setRecords([]);
            return;
        }

        const mappedRecords = items.map((i) => {
            return <tr>
                <td>{i.name}</td>
                <td>{i.quantity}</td>
                <td>{i.salePrice}</td>
                <td><CustomButton onClick={() => {openEditItemModal(i.id)}} className={classes["edit-btn"]}><FaEdit /></CustomButton></td>
            </tr>
        });
        setRecords(mappedRecords);
    }, [items, openEditItemModal]);

    return (
      <div className={classes.category}>
        <h4>{categoryName}</h4>
        {records.length > 0 && (
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{records}</tbody>
          </table>
        )}
        {records.length === 0 && <p>No records found.</p>}
      </div>
    );
};

export default StockTable;