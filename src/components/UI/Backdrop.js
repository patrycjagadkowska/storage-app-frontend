import classes from "./styles/Backdrop.module.css";

const Backdrop = ({ onClick }) => {
    return (
        <div className={classes.backdrop} onClick={onClick} />
    );
};

export default Backdrop;