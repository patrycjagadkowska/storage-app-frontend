import { Outlet } from "react-router";

import Header from "./Header";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </>
    );
};

export default Layout;