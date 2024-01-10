import CustomForm from "../UI/CustomForm";
import { validateEmail, validatePassword } from "../../constants/validationFns";

const LoginForm = () => {
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
        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (res.status === 200 | res.status === 201) {
                console.log("It works!");
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CustomForm inputs={inputs} onSubmit={submitHandler} button="Log in" />
    );
};

export default LoginForm;