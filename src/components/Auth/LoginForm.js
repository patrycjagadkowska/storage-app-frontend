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

    return (
        <CustomForm inputs={inputs} onSubmit={() => {}} button="Log in" />
    );
};

export default LoginForm;