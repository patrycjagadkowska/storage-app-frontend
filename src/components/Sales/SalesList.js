import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import CustomList from "../UI/CustomList";
import ItemsList from "../UI/ItemsList";
import CustomButton from "../UI/CustomButton";

const SalesList = ({ sales, contacts, categories, openDeleteModal, openEditModal }) => {
    const [ salesList, setSalesList ] = useState([]);

    useEffect(() => {
        if (!sales || !Array.isArray(sales) || sales.length === 0) {
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
                title: <div><span>{sale.date + " - " + customer}</span><div>
                    <CustomButton onClick={() => openEditModal(sale.id)}><FaEdit /> <span>Edit</span></CustomButton>
                    <CustomButton onClick={() => openDeleteModal(sale.id)}><RiDeleteBinFill /> <span>Delete</span></CustomButton></div></div>,
                content: <ItemsList title="Sold items" itemsArray={saleItems} />
            }
        });

        setSalesList(mappedSales);
    }, [sales, categories, contacts, openEditModal, openDeleteModal]);

    return (
        <CustomList items={salesList} />
    );
};

export default SalesList;