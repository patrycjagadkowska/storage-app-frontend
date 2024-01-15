import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import CustomLink from "../UI/CustomLink";
import HamburgerButton from "../UI/HamburgerButton";
import Backdrop from "../UI/Backdrop";
import Logo from "./Logo";

import classes from "./styles/Header.module.css";

const Header = ({ links, home }) => {
    const [ navIsOpen, setNavIsOpen ] = useState(false);
    const [ navLinks, setNavLinks ] = useState([]);

    useEffect(() => {
      if (!links || links.length === 0) {
        setNavLinks([]);
        return;
      }
      const mappedLinks = links.map((link) => {
        let mappedLink;
        if (link.type === "link") {
          mappedLink = (
            <NavLink
              className={({ isActive }) =>
                isActive ? classes["active-link"] : ""
              }
              to={link.path}
            >
              {link.text}
            </NavLink>
          );
        } else if (link.type === "custom-link") {
          mappedLink = <CustomLink to={link.path}>{link.text}</CustomLink>;
        }
        return mappedLink;
      });
      setNavLinks(mappedLinks);
    }, [links]);

    console.log(links);

    const toggleNav = () => {
        setNavIsOpen(prevState => !prevState);
    };

    const isMobileView = window.screen.width < 992;

    return (
      <header className={classes.header}>
        <Logo home={home} />
        { navIsOpen && isMobileView && <Backdrop onClick={toggleNav} /> }
        <nav onClick={toggleNav} className={`${classes.nav} ${navIsOpen ? classes["nav-open"] : ""}`}>
            { navLinks }
        </nav>
        <HamburgerButton onClick={toggleNav} navIsOpen={navIsOpen} />
      </header>
    );
};

export default Header;