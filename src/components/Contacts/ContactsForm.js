import { useNavigate } from "react-router";
import { useState } from "react";

import CustomForm from "../UI/CustomForm";
import { validateContactName, validatePhone, validateAddress, validateOptionalEmail } from "../../constants/validationFns";
import { checkIfEmpty } from "../../constants/helperFns";

const ContactsForm = () => {
    const navigate = useNavigate();
    const [ requestError, setRequestError ] = useState(null);

    const inputs = [
        {
            label: "Name",
            id: "name",
            name: "name",
            type: "text",
            initialValue: "",
            validationFn: validateContactName
        },
        {
            label: "Phone",
            id: "phone",
            name: "phone",
            type: "text",
            initialValue: "",
            validationFn: validatePhone,
        },
        {
            label: "Address",
            id: "address",
            name: "address",
            type: "text",
            initialValue: "",
            validationFn: validateAddress,
        },
        {
            label: "Email",
            id: "email",
            name: "email",
            type: "email",
            initialValue: "",
            validationFn: validateOptionalEmail
        }
    ];

    const onSubmit = async (formValues) => {
        setRequestError(null);
        const token = localStorage.getItem("token");
        const contactData = {};

        for (const key in formValues) {
            const isEmpty = checkIfEmpty([formValues[key]]);
            if (!isEmpty) {
                contactData[key] = formValues[key];
            }
        }

        if (!contactData.name) {
            setRequestError("Contact must have a name.");
            return;
        }

        const res = await fetch("http://localhost:8080/addContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(contactData)
        });

        if (res.status === 200 || res.status === 201) {
            navigate(0);
        } else {
            console.log(res);
        }
    };

    return (
      <CustomForm
        inputs={inputs}
        onSubmit={onSubmit}
        button="Add contact"
        formError={requestError}
      />
    );
};

export default ContactsForm;