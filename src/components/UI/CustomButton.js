import classes from "./styles/CustomButtonLink.module.css";

const CustomButton = ({ onClick, children, className, dark, type }) => {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`${classes.btn} ${dark ? classes["link--dark"] : ""} ${
          className ? className : ""
        }`}
      >
        {children}
      </button>
    );
};

export default CustomButton;