import { useEffect, useCallback, useReducer } from "react";
import { useLoaderData, useNavigate } from "react-router";

import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import SuppliesList from "../../components/Supplies/SuppliesList";
import SuppliesForm from "../../components/Supplies/SuppliesForm";
import { fetchData } from "../../constants/helperFns";
import AddCategoryForm from "../../components/ModalForms/AddCategoryForm";
import AddItemForm from "../../components/ModalForms/AddItemForm";
import AddContactForm from "../../components/ModalForms/AddContactForm";
import DeleteForm from "../../components/ModalForms/DeleteForm";
import EditForm from "../../components/ModalForms/EditForm";
import { reducer, initState } from "../../reducers/supplies";

const Supplies = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    const getFormValues = useCallback((formValues) => {
        dispatch({ type: "set_category", data: formValues.category });
    }, []);
    
    useEffect(() => {
        if (!loadedData || !Array.isArray(loadedData) || loadedData.length !== 3) {
          dispatch({ type: "set_supplies", data: [] });
          dispatch({ type: "set_categories", data: [] });
          dispatch({ type: "set_contacts", data: [] });
          return;
        }

        dispatch({ type: "set_supplies", data: loadedData[0].data });
        dispatch({ type: "set_categories", data: loadedData[1].data });
        dispatch({ type: "set_contacts", data: loadedData[2].data });
    }, [loadedData]);

    useEffect(() => {
        if (!state.chosenCategory || state.chosenCategory === "") {
          return;
        }
        const token = localStorage.getItem("token");
        const fetchItems = async (id) => {
          try {
            const fetchedItems = await fetchData(
              token,
              "http://localhost:8080/categories/" + id
            );
            dispatch({ type: "set_items", data: fetchedItems.data });
          } catch (error) {
            console.log(error);
          }
        };
        const categoryId =
          state.categories &&
          state.categories.find((cat) => cat.name === state.chosenCategory).id;
        fetchItems(categoryId);
      }, [state.chosenCategory, state.categories]);

    const listButton = {
        handler: () => dispatch({ type: "hide_form" }),
        text: "Show all supplies"
    };

    const formButton = {
        handler: () => dispatch({ type: "display_form" }),
        text: "Add supply"
    };

    const toggleModal = (modalName) => {
      dispatch({ type: "show_modal", data: state.openModal ? null : modalName });
    };

    const addCategoryHandler = async (categoryName) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8080/addCategory", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ categoryName: categoryName.name })
            });

            if (res.status === 200 || res.status === 201) {
                const response = await res.json();
                const category = response.category;
                dispatch({ type: "add_category", data: category });
            }
            dispatch({ type: "show_modal" });
        } catch (error) {
            console.log(error);
        }
    };

    const addItemHandler = async (item) => {
        const token = localStorage.getItem("token");

        if (!state.chosenCategory) {
            console.log("Choose category first");
            return;
        }
        const categoryId =
          state.categories &&
          state.categories.find((cat) => cat.name === state.chosenCategory).id;

        try {
            const res = await fetch("http://localhost:8080/addItem", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: item.name, categoryId })
            });
            if (res.status === 200 || res.status === 201) {
                const response = await res.json();
                const newItem = response.item;
                dispatch({ type: "add_item", data: newItem });
            }
            dispatch({ type: "show_modal" });
        } catch (error) {
            console.log(error);
        }
    };

    const addSupplierHandler = async (supplier) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/addContact", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(supplier)
            });
            if (res.status === 200 || res.status === 201) {
                const response = await res.json();
                const newContact = response.contact;
                dispatch({ type: "add_contact", data: newContact });
            }
            dispatch({ type: "show_modal" });
        } catch (error) {
            console.log(error);
        }
    };

    const openDeleteFormHandler = (supplyId) => {
      dispatch({ type: "show_modal", data: "delete" });
      dispatch({ type: "set_supply", data: supplyId });
    };

    const deleteSupplyHandler = async () => {
        if (!state.chosenSupply) {
          console.log("No supply chosen");
          return;
        }

        const token = localStorage.getItem("token");

        try {
          const res = await fetch("http://localhost:8080/deleteSupply/"+ state.chosenSupply, {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + token
            }
          });
          if (res.status === 200 || res.status === 201) {
            navigate(0);
          }
        } catch (error) {
          console.log(error);
        }
    };

    const openEditFormHandler = (supplyId) => {
      dispatch({ type: "show_modal", data: "edit" });
      dispatch({ type: "set_supply", data: supplyId });
    };

    const editSupplyHandler = async (formValues) => {
        if (!state.chosenSupply) {
          console.log("No supply chosen");
          return;
        }

        const token = localStorage.getItem("token");
        const supplierId =
          state.contacts &&
          state.contacts.find((c) => c.name === formValues.supplier).id;
        //editting items not available yet
        const prevItems =
          state.supplies &&
          state.supplies
            .find((s) => s.id === state.chosenSupply)
            .Items.map((item) => {
              return {
                itemId: item.id,
                purchasePrice: item.SupplyItem.purchasePrice,
                quantity: item.SupplyItem.quantity,
              };
            });

        try {
          const res = await fetch("http://localhost:8080/supplies/" + state.chosenSupply, {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              supplierId,
              date: formValues.date,
              items: prevItems
            })
          });
          if (res.status === 200 || res.status === 201) {
            navigate(0);
          }
        } catch (error) {
          console.log(error);
        }
    };

    const supplyToBeEditted =
      state.supplies && state.supplies.find((s) => s.id === state.chosenSupply);

    return (
      <>
        <HeaderWithButtons
          header="Supplies"
          listButton={listButton}
          formButton={formButton}
        />
        {!state.showForm && (
          <SuppliesList
            supplies={state.supplies}
            contacts={state.contacts}
            categories={state.categories}
            openDeleteForm={openDeleteFormHandler}
            openEditForm={openEditFormHandler}
          />
        )}
        {state.showForm && (
          <SuppliesForm
            categories={state.categories}
            contacts={state.contacts}
            items={state.items}
            updateCategories={() => toggleModal("category")}
            updateItems={() => toggleModal("item")}
            updateContacts={() => toggleModal("supplier")}
            getFormValues={getFormValues}
          />
        )}
        {state.openModal === "category" && (
          <AddCategoryForm
            toggleModal={() => toggleModal("category")}
            addCategoryHandler={addCategoryHandler}
          />
        )}
        {state.openModal === "item" && (
          <AddItemForm
            toggleModal={() => toggleModal("item")}
            addItemHandler={addItemHandler}
          />
        )}
        {state.openModal === "supplier" && (
          <AddContactForm
            toggleModal={() => toggleModal("supplier")}
            addHandler={addSupplierHandler}
          />
        )}
        {
          state.openModal === "delete" &&
          <DeleteForm
          toggleModal={() => toggleModal("delete")}
          deleteHandler={deleteSupplyHandler}
          deleteItemName="supply"
          />
        }
        {
          state.openModal === "edit" &&
          <EditForm
          toggleModal={() => toggleModal("edit")}
          contacts={state.contacts}
          prevData={supplyToBeEditted}
          editHandler={editSupplyHandler}
          categories={state.categories}
          isSupply={true}
          />
        }
      </>
    );
};

export default Supplies;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const suppliesUrl = "http://localhost:8080/supplies";
    const categoriesUrl = "http://localhost:8080/categories";
    const contactsUrl = "http://localhost:8080/contacts";

        const allData = await Promise.all([
          fetchData(token, suppliesUrl),
          fetchData(token, categoriesUrl),
          fetchData(token, contactsUrl),
        ]);

      return allData;   
};