import { useLoaderData } from "react-router";
import { useEffect, useCallback, useReducer } from "react";

import { fetchData } from "../../constants/helperFns";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import SalesForm from "../../components/Sales/SalesForm";
import SalesList from "../../components/Sales/SalesList";
import AddContactForm from "../../components/ModalForms/AddContactForm";
import EditForm from "../../components/ModalForms/EditForm";
import DeleteForm from "../../components/ModalForms/DeleteForm";
import { initState, reducer } from "../../reducers/sales";
import { validateTokenExpiration } from "../../constants/validationFns";

const Sales = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedData = useLoaderData();

    useEffect(() => {
        if (!loadedData || !Array.isArray(loadedData) || loadedData.length !== 3) {
          dispatch({ type: "set_sales", data: [] });
          dispatch({ type: "set_categories", data: [] });
          dispatch({ type: "set_contacts", data: [] });
          return;
        }

        dispatch({ type: "set_contacts", data: loadedData[0].data });
        dispatch({ type: "set_sales", data: loadedData[1].data });
        dispatch({ type: "set_categories", data: loadedData[2].data });
    }, [loadedData]);

    const getFormValues = useCallback((formValues) => {
      dispatch({ type: "set_category", data: formValues.category });
    }, []);

    useEffect(() => {
      if (!state.chosenCategory || state.chosenCategory === "") {
        return;
      }

      const categoryId =
        state.categories &&
        state.categories.find((c) => c.name === state.chosenCategory).id;
      
      if (!categoryId) {
        console.log("Id not found");
        return;
      }

      const fetchItems = async () => {
        const token = localStorage.getItem("token");

        try {
          const res = await fetchData(token, "http://localhost:8080/categories/" + categoryId);
          dispatch({ type: "set_items", data: res.data });
        } catch (error) {
          console.log(error);
        }
      }

      fetchItems();
    }, [state.chosenCategory, state.categories]);

    const listButton = {
        handler: () => {dispatch({ type: "set_form", data: false })},
        text: "Show all sales"
    };

    const formButton = {
        handler: () => {dispatch({ type: "set_form", data: true })},
        text: "Add sale"
    };

    const addCustomerHandler = async (formValues) => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:8080/addContact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify(formValues)
        });
        if (res.status === 200 || res.status === 201) {
          const customer = await res.json();
          const copiedContacts = [...state.contacts];
          copiedContacts.push(customer.contact);
          dispatch({ type: "set_contacts", data: copiedContacts });
          dispatch({ type: "set_modal" });
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const toggleCustomerModal = () => {
      dispatch({ type: "set_modal", data: state.openModal === "customer" ? null : "customer" });
    };

    const editSaleHandler = async (formValues) => {
      const token = localStorage.getItem("token");
      const { date, customer } = formValues;

      const customerId = state.contacts && state.contacts.find((c) => c.name === customer).id;
      try {
        const res = await fetch("http://localhost:8080/sales/" + state.chosenSale, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({ date, customerId })
        });

        if (res.status === 200 || res.status === 201) {
          const responseData = await res.json();
          const savedSaleData = responseData.data;
          const copiedSales = [...state.sales];
          const existingSaleIndex = copiedSales.findIndex((sale) => {
            return sale.id === savedSaleData.id;
          });

          if (existingSaleIndex < 0) {
            throw new Error("Old and new id don't match!");
          }

          copiedSales.splice(existingSaleIndex, 1, savedSaleData);
          dispatch({ type: "set_sales", data: copiedSales });
          dispatch({ type: "set_modal" });
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const toggleEditModal = (saleId) => {
      dispatch({ type: "set_sale", data: saleId });
      dispatch({ type: "set_modal", data: state.openModal === "edit" ? null : "edit" });
    };

    const deleteSaleHandler = async () => {
        const token = localStorage.getItem("token");

        try {
          const res = await fetch("http://localhost:8080/deleteSale/" + state.chosenSale, {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + token
            }
          });

          if (res.status === 200 || res.status === 201) {
            const copiedSales = [...state.sales];
            const deletedSaleIndex = copiedSales.findIndex((sale) => sale.id === state.chosenSale);
            copiedSales.splice(deletedSaleIndex, 1);
            dispatch({ type: "set_sales", data: copiedSales });
            dispatch({ type: "set_modal" });
          } else {
            console.log(res);
          }
        } catch (error) {
           console.log(error);
        }
    };

    const toggleDeleteModal = (saleId) => {
      dispatch({ type: "set_sale", data: saleId });
      dispatch({ type: "set_modal", data: state.openModal === "delete" ? null : "delete" });
    };

    const saleToBeEditted = state.sales && state.sales.find((s) => s.id === state.chosenSale);

    return (
      <>
        <HeaderWithButtons
          header="Sales"
          listButton={listButton}
          formButton={formButton}
        />
        {!state.showForm && (
          <SalesList
            sales={state.sales}
            contacts={state.contacts}
            categories={state.categories}
            openDeleteModal={toggleDeleteModal}
            openEditModal={toggleEditModal}
          />
        )}
        {state.showForm && (
          <SalesForm
            categories={state.categories}
            contacts={state.contacts}
            getFormValues={getFormValues}
            items={state.items}
            openCustomerForm={toggleCustomerModal}
          />
        )}
        {state.openModal === "customer" && (
          <AddContactForm
            addHandler={addCustomerHandler}
            toggleModal={toggleCustomerModal}
          />
        )}
        {state.openModal === "edit" && (
          <EditForm
            isSupply={false}
            prevData={saleToBeEditted}
            toggleModal={toggleEditModal}
            editHandler={editSaleHandler}
            contacts={state.contacts}
          />
        )}
        {state.openModal === "delete" && (
          <DeleteForm
            deleteHandler={deleteSaleHandler}
            toggleModal={toggleDeleteModal}
            deleteItemName="sale"
          />
        )}
      </>
    );

};

export default Sales;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const tokenNotExpired = validateTokenExpiration(expiresIn);

    if (!tokenNotExpired) {
        const error = new Error("Token expired. Please login again.");
        error.status = 401;
        throw error;
    }
    
    const contactsUrl = "http://localhost:8080/contacts";
    const salesUrl = "http://localhost:8080/sales";
    const categoriesUrl = "http://localhost:8080/categories";

      const allData = await Promise.all([
        fetchData(token, contactsUrl),
        fetchData(token, salesUrl),
        fetchData(token, categoriesUrl)
      ]);

      return allData;
};