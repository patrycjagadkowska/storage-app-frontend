import { useState, useEffect } from "react";

import CustomList from "../UI/CustomList";

import classes from "./ContactsList.module.css";

const ContactsList = ({ contacts }) => {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        if (!contacts || contacts.length === 0) {
            setItems([]);
            return;
        }

        const mappedItems = contacts.map((contact) => {
            const { name, email, address, phone } = contact;

            return {
                title: name,
                content: (<div className={classes["contact-data"]}>
                    <span>Phone: {phone || ""}</span>
                    <span>Address: {address || ""}</span>
                    <span>Email: {email || ""}</span>
                </div>)
            }
        });

        setItems(mappedItems);
    }, [contacts]);

    return (
        <CustomList items={items} />
    );
};

export default ContactsList;