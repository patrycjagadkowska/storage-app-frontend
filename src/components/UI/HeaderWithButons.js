import { FaListAlt, FaRegPlusSquare } from "react-icons/fa";

import CustomButton from "./CustomButton";

import classes from "./styles/HeaderWithButtons.module.css";

const HeaderWithButtons = ({ header, listButton, formButton }) => {
    return (
        <header className={classes.header}>
            <h2>{header}</h2>
            <div className={classes["header__buttons"]}>
                <CustomButton onClick={listButton.handler}>
                    <FaListAlt /> <span>{listButton.text}</span>
                </CustomButton>
                <CustomButton onClick={formButton.handler}>
                    <FaRegPlusSquare /> <span>{formButton.text}</span>
                </CustomButton>
            </div>
        </header>
    );
};

export default HeaderWithButtons;