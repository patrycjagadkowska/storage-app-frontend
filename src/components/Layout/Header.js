import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import CustomLink from "../UI/CustomLink";
import HamburgerButton from "../UI/HamburgerButton";
import Backdrop from "../UI/Backdrop";
import Logo from "./Logo";
import CustomButton from "../UI/CustomButton";

import classes from "./styles/Header.module.css";

const Header = ({ links, home, dashboard, breakpoint }) => {
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
              key={link.text}
            >
              {link.text}
            </NavLink>
          );
        } else if (link.type === "custom-link") {
          mappedLink = <CustomLink to={link.path} key={link.text}>{link.text}</CustomLink>;
        } else if (link.type === "svg-link") {
          mappedLink = (
            <NavLink
              className={({ isActive }) =>
                isActive ? classes["active-link"] : ""
              }
              to={link.path}
              key={link.text}
            >
              {link.svg}
              <span>{link.text}</span>
            </NavLink>
          );
        } else if (link.type === "svg-button") {
          mappedLink = (
            <CustomButton onClick={link.fn} key={link.text}>
              {link.svg}
              <span>{link.text}</span>
            </CustomButton>
          );
        }
        return mappedLink;
      });
      setNavLinks(mappedLinks);
    }, [links]);

    const toggleNav = () => {
        setNavIsOpen(prevState => !prevState);
    };

    const isMobileView = window.screen.width < breakpoint;

    return (
      <header className={`${classes.header} ${dashboard ? classes["dash-header"] : ""}`}>
        <Logo home={home} />
        { navIsOpen && isMobileView && <Backdrop onClick={toggleNav} /> }
        <nav onClick={toggleNav} className={`${classes.nav} ${navIsOpen ? classes["nav-open"] : ""}`}>
            { navLinks }
        </nav>
        { isMobileView && <HamburgerButton onClick={toggleNav} navIsOpen={navIsOpen} />}
      </header>
    );
};

export default Header;