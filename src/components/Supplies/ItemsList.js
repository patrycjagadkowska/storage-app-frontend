import { useState, useEffect } from "react";

import CustomList from "../UI/CustomList";

import classes from "./Supplies.module.css";

const ItemsList = ({ supplyItems }) => {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        if (!supplyItems || supplyItems.length === 0) {
            setItems([]);
            return;
        }

        const mappedItems = supplyItems.map((i) => {
            return {
                title: i.name,
                content: <div className={classes.item}>
                    <span>Category: {i.category}</span>
                    <span>Quantity: {i.quantity}</span>
                    <span>Price: {i.price}</span>
                </div>
            }
        });

        setItems(mappedItems);
    }, [supplyItems]);

    return (
        <div className={classes["items-list"]}>
            <h3>Added items</h3>
            <CustomList items={items} />
        </div>
    );
};

export default ItemsList;