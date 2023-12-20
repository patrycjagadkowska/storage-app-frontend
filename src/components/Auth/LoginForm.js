import CustomForm from "../UI/CustomForm";

const LoginForm = () => {
    const inputs = [
        {
            name: "email",
            label: "Email",
            id: "email",
            type: "email"
        },
        {
            name: "password",
            label: "Password",
            id: "password",
            type: "password"
        }
    ];

    return (
        <CustomForm inputs={inputs} onSubmit={() => {}} />
    );
};

export default LoginForm;