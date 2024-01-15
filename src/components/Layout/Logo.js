import { NavLink } from "react-router-dom";

import classes from "./styles/Header.module.css";

const Logo = ({ home }) => {
    return (
        <div className={classes.logo}>
          <NavLink to={home}>
            <picture>
              <source media="(min-width:768px)" srcSet="logo.png" />
              <img src="logo_sm.png" alt="logo" />
            </picture>
          </NavLink>
        </div>
    );
};

export default Logo;