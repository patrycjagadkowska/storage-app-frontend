import { useState, useEffect } from "react";

import CustomList from "../UI/CustomList";
import SupplyItemsList from "./SupplyItemsList";

const SuppliesList = ({ supplies, contacts, categories }) => {
    const [ suppliesList, setSuppliesList ] = useState([]);

    useEffect(() => {
        if (!Array.isArray(supplies) || !supplies || supplies.length <= 0) {
            setSuppliesList([]);
            return;
        }

        const mappedSupplies = supplies.map((supply) => {
            const supplier = contacts.find((c) => c.id === supply.ContactId);
            return {
                title: `${supply.date} - ${supplier.name}`,
                content: <div>
                    <h4>Supply items</h4>
                    <SupplyItemsList items={supply.Items} categories={categories} />
                </div>
            };
        });
        setSuppliesList(mappedSupplies);
    }, [contacts, supplies, categories])

    return (
        <CustomList items={suppliesList} />
    );
};

export default SuppliesList;