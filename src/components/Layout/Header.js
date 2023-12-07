import { NavLink } from "react-router-dom";
import { useState } from "react";

import CustomLink from "../UI/CustomLink";
import HamburgerButton from "../UI/HamburgerButton";
import Backdrop from "../UI/Backdrop";

import classes from "./styles/Header.module.css";

const Header = () => {
    const [ navIsOpen, setNavIsOpen ] = useState(false);

    const toggleNav = () => {
        setNavIsOpen(prevState => !prevState);
    };

    const isMobileView = window.screen.width < 992;

    return (
      <header className={classes.header}>
        <div className={classes.logo}>
          <NavLink to="/">
            <picture>
              <source media="(min-width:768px)" srcSet="logo.png" />
              <img src="logo_sm.png" alt="logo" />
            </picture>
          </NavLink>
        </div>
        { navIsOpen && isMobileView && <Backdrop onClick={toggleNav} /> }
        <nav onClick={toggleNav} className={`${classes.nav} ${navIsOpen ? classes["nav-open"] : ""}`}>
            <NavLink className={({isActive}) => isActive ? classes["active-link"] : ""} to="/">Our plans</NavLink>
            <NavLink className={({isActive}) => isActive ? classes["active-link"] : ""} to="/reviews">Reviews</NavLink>
            <NavLink className={({isActive}) => isActive ? classes["active-link"] : ""} to="/signup">Sign up</NavLink>
            <CustomLink to="/login">Log in</CustomLink>
        </nav>
        <HamburgerButton onClick={toggleNav} navIsOpen={navIsOpen} />
      </header>
    );
};

export default Header;