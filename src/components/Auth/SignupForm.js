import { useNavigate } from "react-router-dom";
import { useState } from "react";

import CustomForm from "../UI/CustomForm";
import {
  validateEmail,
  validatePassword,
  validateRepeatedPassword
} from "../../constants/validationFns";
import { checkIfEmpty } from "../../constants/helperFns";

const SignupForm = () => {
    const navigate = useNavigate();
    const [ requestError, setRequestError ] = useState(null);
    
    const inputs = [
        {
            name: "email",
            label: "Email",
            id: "email",
            type: "email",
            initialValue: "",
            validationFn: validateEmail
        },
        {
            name: "password",
            label: "Password",
            id: "password",
            type: "password",
            initialValue: "",
            validationFn: validatePassword
        },
        {
            name: "repeat-pass",
            label: "Repeat password",
            id: "repeat-pass",
            type: "password",
            initialValue: "",
            validationFn: validateRepeatedPassword
        }
    ];

    const submitHandler = async (formData) => {
        setRequestError(null);
        const formValues = Object.values(formData);
        const isEmpty = checkIfEmpty(formValues);
        if (isEmpty) {
            setRequestError("Please fill all the fields.");
            return;
        }
        try {
            const res = await fetch("http://localhost:8080/signup", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.status === 200 || res.status === 201) {
                navigate("/login");
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <CustomForm
        inputs={inputs}
        onSubmit={submitHandler}
        button="Sign up"
        formError={requestError}
      />
    );
};

export default SignupForm;