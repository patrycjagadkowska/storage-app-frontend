import { Link } from "react-router-dom";

import classes from "./styles/CustomButtonLink.module.css";

const CustomLink = ({ to, className, children }) => {
    return (
        <Link to={to} className={`${classes.link} ${className ? className : ""}`}>
            {children}
        </Link>
    );
};

export default CustomLink;