import Section from "../../components/HomePage/Section";
import Plans from "../../components/HomePage/Plans";

import classes from "./pages.module.css";

const PlansPage = () => {
    const mainSectionImg = <img src="plans.png" alt="Plans" />

    const mainSectionInfo = <div className={`${classes["main-section__info"]} ${classes.light}`}>
        <h1>Check our plans</h1>
        <p>Choose from one of three plans and enjoy using our app for 1 month free trial!</p>
    </div>

    const plansInfo = [
        {
            title: "Basic",
            details: [
                "store data in database",
                "access to all features",
                "cheap techincal support",
                "max 1GB data"
            ],
            price: "5$/month"
        },
        {
            title: "Recommended",
            details: [
                "store data in database",
                "access to all features",
                "once a month free technical support",
                "max 10GB data"
            ],
            price: "15$/month"
        },
        {
            title: "Premium",
            details: [
                "store data in database",
                "access to all features",
                "free technical support",
                "max 50GB data"
            ],
            price: "25$/month"
        }
    ];

    return (
        <>
            <Section info={mainSectionInfo} img={mainSectionImg} bubble={true} />
            <Plans plansInfo={plansInfo} />
        </>
    );
};

export default PlansPage;