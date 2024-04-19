import { useEffect, useState } from "react";

import classes from "./styles/Plans.module.css";

const Plan = ({ title, details, price }) => {
    const [ listItems, setListItems ] = useState([]);

    useEffect(() => {
        if (!details || details.length === 0) {
            setListItems([]);
            return;
        }

        const mappedList = details.map((detail, index) => {
            return <li key={`${detail.substring(0, 3)}/${index}`} className={classes["plan__detail"]}>{detail}</li>
        });
        setListItems(mappedList);
    }, [details]);

    return (
        <div className={classes.plan}>
            <h3>{ title }</h3>
            <ul className={classes["plan__details"]}>
                {listItems}
            </ul>
            <span className={classes["plan__price"]}>{price}</span>
        </div>
    );
};

export default Plan;