import { useNavigate } from "react-router";

import CustomForm from "../UI/CustomForm";
import { validateContactName, validatePhone, validateAddress, validateOptionalEmail } from "../../constants/validationFns";

const ContactsForm = () => {
    const navigate = useNavigate();

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
        const { name, email, address, phone } = formValues;
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/addContact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                name, email, address, phone
            })
        });

        if (res.status === 200 || res.status === 201) {
            navigate(0);
        } else {
            console.log(res);
        }
    };

    return (
        <CustomForm inputs={inputs} onSubmit={onSubmit} button="Add contact" />
    );
};

export default ContactsForm;