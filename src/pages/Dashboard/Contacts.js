import { useLoaderData, useNavigate } from "react-router";
import { useReducer, useEffect } from "react";

import ContactsList from "../../components/Contacts/ContactsList";
import ContactsForm from "../../components/Contacts/ContactsForm";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import { initState, reducer } from "../../reducers/contacts";
import DeleteForm from "../../components/ModalForms/DeleteForm";
import EditContactForm from "../../components/ModalForms/EditContactForm";
import { validateTokenExpiration } from "../../constants/validationFns";

const Contacts = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedContacts = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (loadedContacts) {
            dispatch({ type: "set_contacts", data: loadedContacts.data });
        }
    }, [loadedContacts]);

    const showListHandler = () => {
        dispatch({ type: "hide_form" });
    };

    const showFormHandler = () => {
        dispatch({ type: "display_form" });
    };

    const listButton = {
        handler: showListHandler,
        text: "Show all contacts"
    };

    const formButton = {
        handler: showFormHandler,
        text: "Add contact"
    };

    const openDeleteModal = (id) => {
        dispatch({ type: "set_contact", data: id });
        dispatch({ type: "set_modal", data: "delete" });
    };

    const toggleDeleteModal = () => {
        dispatch({ type: "set_modal", data: state.openModal ? null : "delete" });
    };

    const deleteHandler = async () => {
        const token = localStorage.getItem("token");

        try {
            if (!state.chosenContact) {
                return;
            }
            const res = await fetch("http://localhost:8080/deleteContact/" + state.chosenContact, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer: " + token
                }
            });

            if (res.status === 200 || res.status === 201) {
                navigate(0);
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const openEditModal = (id) => {
        dispatch({ type: "set_contact", data: id });
        dispatch({ type: "set_modal", data: "edit" });
    };

    const toggleEditModal = () => {
        dispatch({ type: "set_modal", data: state.openModal ? null : "edit" });
    };

    const editHandler = async (formValues) => {
        const token = localStorage.getItem("token");
        const { name, phone, address, email } = formValues;

        try {
            if (!state.chosenContact) {
                return;
            }
            const res = await fetch(
              "http://localhost:8080/editContact/" + state.chosenContact,
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name || prevData.name,
                  email: email || prevData.email,
                  address: address || prevData.address,
                  phone: phone || prevData.phone,
                }),
              }
            );

            if (res.status === 200 || res.status === 201) {
                navigate(0);
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const prevData =
      state.chosenContact &&
      state.contacts.find((c) => c.id === state.chosenContact);

    return (
      <>
        <HeaderWithButtons
          header="Contacts"
          listButton={listButton}
          formButton={formButton}
        />
        {!state.showForm && (
          <ContactsList
            contacts={state.contacts}
            openDeleteModal={openDeleteModal}
            openEditModal={openEditModal}
          />
        )}
        {state.showForm && <ContactsForm />}
        {state.openModal === "delete" && (
          <DeleteForm
            deleteHandler={deleteHandler}
            toggleModal={toggleDeleteModal}
            deleteItemName={`${state.chosenContact || " "} contact`}
          />
        )}
        {state.openModal === "edit" && (
          <EditContactForm
            editHandler={editHandler}
            toggleModal={toggleEditModal}
            prevData={prevData}
          />
        )}
      </>
    );
};

export default Contacts;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const tokenNotExpired = validateTokenExpiration(expiresIn);

    if (!tokenNotExpired) {
      const error = new Error("Token expired. Please login again.");
      error.status = 401;
      throw error;
    }

    const res = await fetch("http://localhost:8080/contacts", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    return res;
};