import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    const headerLinks = [
        {
            type: "link",
            path: "/plans",
            text: "Our plans"
        },
        {
            type: "link",
            path: "/reviews",
            text: "Reviews"
        },
        {
            type: "link",
            path: "/signup",
            text: "Sign up"
        },
        {
            type: "custom-link",
            path: "/login",
            text: "Log in"
        }
    ];

    return (
        <>
            <Header links={headerLinks} home="/" />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;