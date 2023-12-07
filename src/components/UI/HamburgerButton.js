import classes from "./styles/HamburgerButton.module.css";

const HamburgerButton = ({ onClick, navIsOpen }) => {
    return (
      <button
        onClick={onClick}
        className={`${classes["hamburger-btn"]} ${
          navIsOpen ? classes.open : ""
        }`}
      >
        <span />
        <span />
        <span />
      </button>
    );
};

export default HamburgerButton;