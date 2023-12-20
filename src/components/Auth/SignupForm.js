import CustomForm from "../UI/CustomForm";

const SignupForm = () => {
    const inputs = [
        {
            name: "email",
            label: "Email",
            id: "email",
            type: "email",
            error: "An error occured"
        },
        {
            name: "password",
            label: "Password",
            id: "password",
            type: "password"
        },
        {
            name: "repeat-pass",
            label: "Repeat password",
            id: "repeat-pass",
            type: "password"
        }
    ]
    return (
        <CustomForm inputs={inputs} onSubmit={() => {}} />
    );
};

export default SignupForm;