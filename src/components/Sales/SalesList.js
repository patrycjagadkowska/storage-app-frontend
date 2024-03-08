import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import CustomList from "../UI/CustomList";
import CustomButton from "../UI/CustomButton";
import SaleItemsList from "./SaleItemsList";

import classes from "../UI/styles/ComplexList.module.css";

const SalesList = ({ sales, contacts, categories, openDeleteModal, openEditModal }) => {
    const [ salesList, setSalesList ] = useState([]);

    useEffect(() => {
        if (!sales || !Array.isArray(sales) || sales.length === 0) {
            setSalesList([]);
            return;
        }

        const mappedSales = sales.map((sale) => {
            const customer = contacts.find((c) => c.id === sale.ContactId).name;
            return {
              title: (
                <div className={classes["list-header"]}>
                  <span>{sale.date + " - " + customer}</span>
                  <div className={classes["list-header__handlers"]}>
                    <CustomButton
                      className={classes["list-header__handler"]}
                      onClick={() => openEditModal(sale.id)}
                    >
                      <FaEdit /> <span>Edit</span>
                    </CustomButton>
                    <CustomButton
                      className={classes["list-header__handler"]}
                      onClick={() => openDeleteModal(sale.id)}
                    >
                      <RiDeleteBinFill /> <span>Delete</span>
                    </CustomButton>
                  </div>
                </div>
              ),
              content: (
                <SaleItemsList items={sale.Items} categories={categories} />
              ),
            };
        });

        setSalesList(mappedSales);
    }, [sales, categories, contacts, openEditModal, openDeleteModal]);

    return (
        <CustomList items={salesList} />
    );
};

export default SalesList;