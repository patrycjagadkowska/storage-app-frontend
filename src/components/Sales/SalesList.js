import { useState, useEffect } from "react";

import CustomList from "../UI/CustomList";
import ItemsList from "../UI/ItemsList";


const SalesList = ({ sales, contacts, categories }) => {
    const [ salesList, setSalesList ] = useState([]);

    useEffect(() => {
        if (sales.length === 0) {
            setSalesList([]);
            return;
        }

        const mappedSales = sales.map((sale) => {
            const customer = contacts.find((c) => c.id === sale.ContactId).name;
            const saleItems = sale.Items.map((i) => {
                const categoryName = categories.find((c) => c.id === i.CategoryId).name;
                return {
                    name: i.name,
                    category: categoryName,
                    price: i.SaleItem.price,
                    quantity: i.SaleItem.quantity
                };
            });
            return {
                title: sale.date + " - " + customer,
                content: <ItemsList title="Sold items" itemsArray={saleItems} />
            }
        });

        setSalesList(mappedSales);
    }, [sales, categories, contacts]);

    return (
        <CustomList items={salesList} />
    );
};

export default SalesList;