import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CustomForm from "../UI/CustomForm";
import { validateEmail, validatePassword } from "../../constants/validationFns";
import { checkIfEmpty } from "../../constants/helperFns";

const LoginForm = () => {
    const navigate = useNavigate();
    const [ requestError, setRequestError ] = useState(null);

    const inputs = [
        {
            name: "email",
            label: "Email",
            id: "email",
            type: "email", 
            initialValue: "",
            validationFn: validateEmail,
        },
        {
            name: "password",
            label: "Password",
            id: "password",
            type: "password",
            initialValue: "",
            validationFn: validatePassword
        }
    ];

    const submitHandler = async (formData) => {
        const formValues = Object.values(formData);
        const isEmpty = checkIfEmpty(formValues);
        if (isEmpty) {
            setRequestError("Please fill all the fields.");
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (res.status === 200 | res.status === 201) {
                const data = await res.json();
                const { userId, token } = data;
                localStorage.setItem("userId", userId);
                localStorage.setItem("token", token);
                navigate("/dashboard");
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
      <CustomForm
        inputs={inputs}
        onSubmit={submitHandler}
        button="Log in"
        formError={requestError}
      />
    );
};

export default LoginForm;