import classes from "./styles/CustomButtonLink.module.css";

const CustomButton = ({ onClick, children, className, dark }) => {
    return (
      <button
        onClick={onClick}
        className={`${classes.btn} ${dark ? classes["link--dark"] : ""} ${
          className ? className : ""
        }`}
      >
        {children}
      </button>
    );
};

export default CustomButton;