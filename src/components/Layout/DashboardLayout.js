import { FaWarehouse, FaPowerOff } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdPointOfSale } from "react-icons/md";
import { IoMdContact, IoMdSettings } from "react-icons/io";

import Header from "./Header";
import DashboardFooter from "./DashboardFooter";
import DashboardMain from "./DashboardMain";

const DashboardLayout = () => {
    const logout = () => {};
    
    const headerLinks = [
        {
            type: "svg-link",
            path: "/dashboard/stock",
            text: "stock",
            svg: <FaWarehouse />
        },
        {
            type: "svg-link",
            path: "/dashboard/supplies",
            text: "supplies",
            svg: <TbTruckDelivery />
        },
        {
            type: "svg-link",
            path: "/dashboard/sales",
            text: "sales",
            svg: <MdPointOfSale />
        },
        {
            type: "svg-link",
            path: "/dashboard/contacts",
            text: "contacts",
            svg: <IoMdContact />
        },
        {
            type: "svg-link",
            path: "/dashboard/settings",
            text: "settings",
            svg: <IoMdSettings />
        },
        {
            type: "svg-button",
            text: "logout",
            svg: <FaPowerOff />,
            fn: logout
        }
    ];

    return (
        <>
            <Header home="/dashboard" links={headerLinks} dashboard={true} breakpoint={576} />
            <DashboardMain />
            <DashboardFooter />
        </>
    );
};

export default DashboardLayout;