import classes from "./styles/CustomButtonLink.module.css";

const CustomButton = ({ onClick, children, className }) => {
    return (
        <button onClick={onClick} className={`${classes.btn} ${className ? className : ""}`}>
            {children}
        </button>
    );
};

export default CustomButton;