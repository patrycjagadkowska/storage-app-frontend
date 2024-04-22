import { useState } from "react";

import Modal from "../UI/Modal";
import CustomForm from "../UI/CustomForm";
import {
  validateContactName,
  validateOptionalEmail,
  validatePhone,
  validateAddress,
} from "../../constants/validationFns";
import { checkIfEmpty } from "../../constants/helperFns";

const AddContactForm = ({ toggleModal, addHandler }) => {
    const [ requestError, setRequestError ] = useState(null);

    const inputs = [
        {
            label: "Name",
            name: "name",
            id: "name",
            validationFn: validateContactName,
            initialValue: "",
            type: "text",
        },
        {
            label: "Email",
            name: "email",
            id: "email",
            validationFn: validateOptionalEmail,
            initialValue: "",
            type: "email",
        },
        {
            label: "Phone",
            name: "phone",
            id: "phone",
            validationFn: validatePhone,
            type: "text",
            initialValue: ""
        },
        {
            label: "Address",
            name: "address",
            id: "address",
            validationFn: validateAddress,
            initialValue: ""
        }
    ];

    const submitHandler = (formValues) => {
        setRequestError(null);

        const contactData = {};
        const nameIsEmpty = checkIfEmpty([formValues.name]);

        if (nameIsEmpty) {
            setRequestError("Contact must have a name.");
            return;
        }

        for (const key in formValues) {
            const valueIsEmpty = checkIfEmpty([formValues[key]]);
            if (!valueIsEmpty) {
                contactData[key] = formValues[key];
            }
        }

        addHandler(contactData);
    };

    return (
      <Modal toggleModal={toggleModal}>
        <h3>Add new contact</h3>
        <CustomForm
          inputs={inputs}
          onSubmit={submitHandler}
          button="Add"
          formError={requestError}
        />
      </Modal>
    );
};

export default AddContactForm;