import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";

import ContactsList from "../../components/Contacts/ContactsList";
import ContactsForm from "../../components/Contacts/ContactsForm";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";

const Contacts = () => {
    const [ contacts, setContacts ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const loadedContacts = useLoaderData();

    useEffect(() => {
        if (loadedContacts) {
            setContacts(loadedContacts.data);
        }
    }, [loadedContacts]);

    const showListHandler = () => {
        setShowForm(false);
    };

    const showFormHandler = () => {
        setShowForm(true);
    };

    const listButton = {
        handler: showListHandler,
        text: "Show all contacts"
    };

    const formButton = {
        handler: showFormHandler,
        text: "Add contact"
    };

    return (
      <>
        <HeaderWithButtons
          header="Contacts"
          listButton={listButton}
          formButton={formButton}
        />
        {!showForm && <ContactsList contacts={contacts} />}
        {showForm && <ContactsForm />}
      </>
    );
};

export default Contacts;

export const loader = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/contacts", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
};