import { Link } from "react-router-dom";

import classes from "./styles/Footer.module.css";

const DashboardFooter = () => {
    return (
        <footer className={classes["dash-footer"]}>
            <div className={classes["footer__nav"]}>
                <ul className={classes["footer__nav--links"]}>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/dashboard">dashboard</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/dashboard/stock">stock</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/dashboard/supplies">supplies</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/dashboard/sales">sales</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/dashboard/contacts">contacts</Link>
                    </li>
                    <li className={classes["footer__nav--link"]}>
                        <Link to="/dashboard/settings"></Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default DashboardFooter;