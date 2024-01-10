import { useNavigate } from "react-router-dom";

import CustomForm from "../UI/CustomForm";
import {
  validateEmail,
  validatePassword,
  validateRepeatedPassword
} from "../../constants/validationFns";

const SignupForm = () => {
    const navigate = useNavigate();
    
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
        <CustomForm inputs={inputs} onSubmit={submitHandler} button="Sign up" />
    );
};

export default SignupForm;