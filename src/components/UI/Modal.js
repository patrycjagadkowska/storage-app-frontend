import Backdrop from "./Backdrop";
import CustomButton from "./CustomButton";

import classes from "./styles/Modal.module.css";

const Modal = ({ toggleModal, children }) => {
    return (
        <>
            <Backdrop onClick={toggleModal} />
            <dialog open className={classes.modal}>
                <CustomButton onClick={toggleModal}>X</CustomButton>
                { children }
            </dialog>
        </>
    );
};

export default Modal; 