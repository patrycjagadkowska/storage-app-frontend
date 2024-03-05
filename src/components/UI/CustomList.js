import { useState, useEffect } from "react";

import CustomListItem from "./CustomListItem";

import classes from "./styles/CustomList.module.css";

const CustomList = ({ items }) => {
    const [ listItems, setListItems ] = useState([]);

    useEffect(() => {
        if (!items || items.length === 0) {
            setListItems([]);
            return;
        }

        const mappedItems = items.map((item, index) => {
            const { title, content } = item;
            return (
                <CustomListItem title={title} key={index}>
                    { content }
                </CustomListItem>
            );
        });
        setListItems(mappedItems);
    }, [items]);

    return (
        <ol className={classes.list}>
            { listItems.length > 0 && listItems }
            { listItems.length === 0 && <p>No data found.</p>}
        </ol>
    );
};

export default CustomList;