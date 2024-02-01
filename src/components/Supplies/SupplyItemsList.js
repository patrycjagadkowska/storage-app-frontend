import { useState, useEffect } from "react";

import CustomList from "../UI/CustomList";

const SupplyItemsList = ({ items, categories }) => {
    const [ itemsList, setItemsList ] = useState([]);

    useEffect(() => {
        if (!Array.isArray(items) || !items || items.length <= 0) {
            setItemsList([]);
            return;
        }

        const mappedItems = items.map((i) => {
            const categoryName = categories.find((c) => c.id === i.CategoryId).name;

            return {
                title: i.name,
                content: <div>
                    <span>Category: {categoryName}</span>
                    <span>Quantity: {i.SupplyItem.quantity}</span>
                    <span>Price: {i.SupplyItem.purchasePrice}</span>
                </div>
            };
        });
        setItemsList(mappedItems);
    }, [items, categories]);

    return (
        <CustomList items={itemsList} />
    );
};

export default SupplyItemsList;