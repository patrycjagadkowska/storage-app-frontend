import { Link } from "react-router-dom";

import classes from "./styles/CustomButtonLink.module.css";

const CustomLink = ({ to, className, children, dark }) => {
    return (
      <Link
        to={to}
        className={`${classes.link} ${dark ? classes["link--dark"] : ""} ${
          className ? className : ""
        }`}
      >
        {children}
      </Link>
    );
};

export default CustomLink;