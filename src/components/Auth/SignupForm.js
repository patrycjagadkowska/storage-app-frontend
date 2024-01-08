import CustomForm from "../UI/CustomForm";
import {
  validateEmail,
  validatePassword,
  validateRepeatedPassword
} from "../../constants/validationFns";

const SignupForm = () => {
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
    ]
    return (
        <CustomForm inputs={inputs} onSubmit={() => {}} button="Sign up" />
    );
};

export default SignupForm;