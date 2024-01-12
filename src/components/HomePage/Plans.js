import { useState, useEffect } from "react";

import Plan from "./Plan";

import classes from "./styles/Plans.module.css";

const Plans = ({ plansInfo }) => {
    const [ plans, setPlans ] = useState([]);

    useEffect(() => {
        if (!plansInfo || plansInfo.length === 0) {
            setPlans([]);
            return;
        }

        const mappedPlans = plansInfo.map((plan) => {
            const { title, details, price } = plan;
            return <Plan title={title} details={details} price={price} />;
        });
        setPlans(mappedPlans);
    }, [plansInfo]);

    return (
        <section className={classes.plans}>
            { plans }
        </section>
    );
};

export default Plans;