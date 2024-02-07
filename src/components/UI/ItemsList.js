import { useState, useEffect } from "react";

import CustomList from "./CustomList";

import classes from "./styles/CustomList.module.css";

const ItemsList = ({ itemsArray, title }) => {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        if (!itemsArray || itemsArray.length === 0) {
            setItems([]);
            return;
        }

        const mappedItems = itemsArray.map((i) => {
            return {
                title: i.item,
                content: <div className={classes.item}>
                    <span>Category: {i.category}</span>
                    <span>Quantity: {i.quantity}</span>
                    <span>Price: {i.price}</span>
                </div>
            }
        });

        setItems(mappedItems);
    }, [itemsArray]);
    return (
        <div className={classes["items-list"]}>
            <h3>{title}</h3>
            <CustomList items={items} />
        </div>
    );
};

export default ItemsList;