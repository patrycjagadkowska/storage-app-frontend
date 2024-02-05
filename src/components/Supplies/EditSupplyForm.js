// import { useState, useEffect } from "react";

import CustomForm from "../UI/CustomForm";
import Modal from "../UI/Modal";
import { validateDate, validateSelect } from "../../constants/validationFns";

const EditSupplyForm = ({ supply, toggleModal, editSupplyHandler, contacts, categories }) => {
    const supplierName = contacts.find((c) => c.id === supply.ContactId).name;
    const contactsOptions = contacts.map((c) => c.name);

    const inputs = [
        {
            label: "Date",
            name: "date",
            id: "date",
            initialValue: supply.date,
            placeholder: supply.date,
            validationFn: validateDate,
            type: "date"
        }, 
        {
            label: "Supplier",
            name: "supplier",
            id: "supplier",
            initialValue: supplierName,
            placeholder: supplierName,
            validationFn: validateSelect,
            type: "select",
            options: contactsOptions
        }
    ];

    return (
        <Modal toggleModal={toggleModal}>
            <h3>Edit supply</h3>
            <CustomForm inputs={inputs} button="Confirm changes" onSubmit={editSupplyHandler} />
        </Modal>
    );
};

export default EditSupplyForm;