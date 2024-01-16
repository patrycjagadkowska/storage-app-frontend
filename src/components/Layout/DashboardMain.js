import { Outlet } from "react-router";

import classes from "./styles/Main.module.css";

const DashboardMain = () => {
    return (
        <main className={classes.main}>
            <Outlet />
        </main>
    );
};

export default DashboardMain;