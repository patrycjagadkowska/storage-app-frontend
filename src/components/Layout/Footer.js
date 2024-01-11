import { Link } from "react-router-dom";

import classes from "./styles/Footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes["footer__copyright"]}>
                <p>&copy; Patrycja Gadkowska 2024</p>
            </div>
            <div className={classes["footer__nav"]}>
                <ul className={classes["footer__nav--links"]}>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/plans">Plans</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/reviews">Reviews</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                <ul className={classes["footer__nav--links"]}>
                    <li className={classes["footer__nav--link"]}>
                        <a href="https://patrycjagadkowska.netlify.app">My portfolio</a>    
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <a href="https://www.linkedin.com/in/patrycja-gadkowska-600b34154/">LinkedIn</a>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <a href="https://github.com/patrycjagadkowska">GitHub</a>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <a href="mailto:patrycjagadkowska@gmail.com">Email me!</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;