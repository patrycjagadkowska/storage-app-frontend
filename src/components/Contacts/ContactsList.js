import { useState, useEffect } from "react";

import CustomList from "../UI/CustomList";
import ListHeader from "../UI/ListHeader";

import classes from "./ContactsList.module.css";

const ContactsList = ({ contacts, openDeleteModal }) => {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        if (!contacts || contacts.length === 0) {
            setItems([]);
            return;
        }

        const mappedItems = contacts.map((contact) => {
            const { name, email, address, phone } = contact;

            return {
              title: (
                <ListHeader
                  header={name}
                  editHandler={() => {}}
                  deleteHandler={() => {
                    openDeleteModal(contact.id);
                  }}
                />
              ),
              content: (
                <div className={classes["contact-data"]}>
                  <span>Phone: {phone || ""}</span>
                  <span>Address: {address || ""}</span>
                  <span>Email: {email || ""}</span>
                </div>
              ),
            };
        });

        setItems(mappedItems);
    }, [contacts, openDeleteModal]);

    return (
        <CustomList className={classes["contact-list"]} items={items} />
    );
};

export default ContactsList;