import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import CustomList from "../UI/CustomList";
import SupplyItemsList from "./SupplyItemsList";
import CustomButton from "../UI/CustomButton";

const SuppliesList = ({ supplies, openDeleteForm, contacts, categories }) => {
    const [ suppliesList, setSuppliesList ] = useState([]);

    useEffect(() => {
        if (!Array.isArray(supplies) || !supplies || supplies.length <= 0) {
            setSuppliesList([]);
            return;
        }

        const mappedSupplies = supplies.map((supply) => {
            const supplier = contacts.find((c) => c.id === supply.ContactId);
            const deleteFormHandler = () =>{
                openDeleteForm(supply.id);
            };
            
            return {
                title: <div><span>{supply.date} - {supplier.name}</span><div>
                    <CustomButton><FaEdit /><span>Edit</span></CustomButton>
                    <CustomButton onClick={deleteFormHandler}><RiDeleteBinFill /><span>Delete</span></CustomButton></div></div>,
                content: <div>
                    <h4>Supply items</h4>
                    <SupplyItemsList items={supply.Items} categories={categories} />
                </div>
            };
        });
        setSuppliesList(mappedSupplies);
    }, [contacts, supplies, categories, openDeleteForm]);

    return (
        <CustomList items={suppliesList} />
    );
};

export default SuppliesList;