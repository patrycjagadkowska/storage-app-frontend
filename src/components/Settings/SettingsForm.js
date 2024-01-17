import { useNavigate } from "react-router-dom";

import CustomForm from "../UI/CustomForm";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateRepeatedPassword,
} from "../../constants/validationFns";

const SettingsForm = ({ oldValues, setFormError }) => {
    const navigate = useNavigate();

    const inputs = [
        {
            label: "Name",
            id: "name",
            name: "name",
            type: "text",
            initialValue: oldValues.userName || "",
            placeholder: oldValues.userName || "",
            validationFn: validateName
        },
        {
            label: "Email",
            id: "email",
            name: "email",
            type: "email",
            initialValue: oldValues.email || "",
            placeholder: oldValues.email || "",
            validationFn: validateEmail
        },
        {
            label: "Old password",
            id: "oldPass",
            name: "oldPass",
            type: "password",
            initialValue: "",
            validationFn: validatePassword
        },
        {
            label: "New password",
            id: "newPass",
            name: "newPass",
            type: "password",
            initialValue: "",
            validationFn: validatePassword
        },
        {
            label: "Repeat new password",
            id: "repeatPass",
            name: "repeatPass",
            type: "password",
            initialValue: "",
            validationFn: validateRepeatedPassword
        }
    ];

    const submitHandler = async (formValues) => {
        const { email, userName, oldPass, newPass, repeatPass } = formValues;
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/userData", {
          method: "POST",
          body: JSON.stringify({
            email: email && email.length > 0 ? email : oldValues.email,
            userName: userName && userName.length > 0 ? userName : oldValues.userName,
            oldPass,
            newPass,
            repeatPass,
          }),
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          }
        });

        if (res.status === 200 || res.status === 201) {
            navigate("/dashboard/settings");
        } else {
            console.log(res);
        }
    };

    return (
        <CustomForm inputs={inputs} onSubmit={submitHandler} button="Save changes" />
    );
};

export default SettingsForm;