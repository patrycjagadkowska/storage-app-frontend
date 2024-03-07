import { useState, useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import CustomList from "../UI/CustomList";
import SupplyItemsList from "./SupplyItemsList";
import CustomButton from "../UI/CustomButton";

import classes from "../UI/styles/ComplexList.module.css";

const SuppliesList = ({ supplies, openDeleteForm, openEditForm, contacts, categories }) => {
    const [ suppliesList, setSuppliesList ] = useState([]);

    useEffect(() => {
        if (!Array.isArray(supplies) || !supplies || supplies.length <= 0) {
            setSuppliesList([]);
            return;
        }

        const mappedSupplies = supplies.map((supply) => {
            const supplier = contacts.find((c) => c.id === supply.ContactId);
            const deleteFormHandler = () => {
                openDeleteForm(supply.id);
            };
            const editFormHandler = () => {
                openEditForm(supply.id);
            };
            
            return {
              title: (
                <div className={classes["list-header"]}>
                  <span className={classes["list-header__main-header"]}>
                    {supply.date}
                  </span>
                  <div className={classes["list-header__handlers"]}>
                    <CustomButton
                      className={classes["list-header__handler"]}
                      onClick={editFormHandler}
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </CustomButton>
                    <CustomButton
                      className={classes["list-header__handler"]}
                      onClick={deleteFormHandler}
                    >
                      <RiDeleteBinFill />
                      <span>Delete</span>
                    </CustomButton>
                  </div>
                </div>
              ),
              content: (
                <div className={classes["inner-list-ctr"]}>
                  <p className={classes["inner-list-ctr__add-info"]}>
                    Supplier: <span>{supplier.name}</span>
                  </p>
                  <h4 className={classes["inner-list-ctr__header"]}>Supply items</h4>
                  <SupplyItemsList
                    items={supply.Items}
                    categories={categories}
                  />
                </div>
              ),
            };
        });
        setSuppliesList(mappedSupplies);
    }, [contacts, supplies, categories, openDeleteForm, openEditForm]);

    return (
        <CustomList items={suppliesList} noBorder={true} />
    );
};

export default SuppliesList;