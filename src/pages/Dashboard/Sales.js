import { useLoaderData, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";

import { fetchData } from "../../constants/helperFns";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import SalesForm from "../../components/Sales/SalesForm";
import SalesList from "../../components/Sales/SalesList";
import AddContactForm from "../../components/ModalForms/AddContactForm";
import EditForm from "../../components/ModalForms/EditForm";
import DeleteForm from "../../components/ModalForms/DeleteForm";

const Sales = () => {
    const [ sales, setSales ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ contacts, setContacts ] = useState([]);
    const [ items, setItems ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const [ chosenCategory, setChosenCategory ] = useState(null);
    const [ chosenSale, setChosenSale ] = useState(null);
    const [ openCustomerForm, setOpenCustomerForm ] = useState(false);
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
    const [ openEditModal, setOpenEditModal ] = useState(false);
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadedData.sales || !Array.isArray(loadedData.sales) || loadedData.sales.length === 0) {
          setSales([]);
        } else {
          setSales(loadedData.sales);
        }

        if (!loadedData.categories || !Array.isArray(loadedData.categories) || loadedData.categories.length === 0) {
          setCategories([]);
        } else {
          setCategories(loadedData.categories);
        }

        if (!loadedData.contacts || !Array.isArray(loadedData.contacts) || loadedData.contacts.length === 0) {
          setContacts([]);
        } else {
          setContacts(loadedData.contacts);
        }
    }, [loadedData]);

    const getFormValues = useCallback((formValues) => {
      setChosenCategory(formValues.category);
    }, []);

    useEffect(() => {
      if (!chosenCategory || chosenCategory === "") {
        return;
      }

      const categoryId = categories.find((c) => c.name === chosenCategory).id;
      
      if (!categoryId) {
        console.log("Id not found");
        return;
      }

      const fetchItems = async () => {
        const token = localStorage.getItem("token");

        try {
          const res = await fetchData(token, "http://localhost:8080/categories/" + categoryId);
          setItems(res.data);
        } catch (error) {
          console.log(error);
        }
      }

      fetchItems();
    }, [chosenCategory, categories]);

    const listButton = {
        handler: () => {setShowForm(false)},
        text: "Show all sales"
    };

    const formButton = {
        handler: () => {setShowForm(true)},
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
          const copiedContacts = [...contacts];
          copiedContacts.push(customer.contact);
          setContacts(copiedContacts);
          setOpenCustomerForm(false);
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const toggleCustomerModal = () => {
      setOpenCustomerForm((prevState) => !prevState);
    };

    const editSaleHandler = async (formValues) => {
      const token = localStorage.getItem("token");
      const { date, customer } = formValues;

      const customerId = contacts.find((c) => c.name === customer).id;
      try {
        const res = await fetch("http://localhost:8080/sales/" + chosenSale, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: JSON.stringify({ date, customerId })
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

    const toggleEditModal = (saleId) => {
      setChosenSale(saleId);
      setOpenEditModal((prevState) => !prevState);
    };

    const deleteSaleHandler = async () => {
        const token = localStorage.getItem("token");

        try {
          const res = await fetch("http://localhost:8080/deleteSale/" + chosenSale, {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + token
            }
          });

          if (res.status === 200 || res.status === 201) {
            navigate(0)
          } else {
            console.log(res);
          }
        } catch (error) {
           console.log(error);
        }
    };

    const toggleDeleteModal = (saleId) => {
      setChosenSale(saleId);
      setOpenDeleteModal((prevState) => !prevState);
    };

    const saleToBeEditted = sales.find((s) => s.id === chosenSale);

    return (
      <>
        <HeaderWithButtons
          header="Sales"
          listButton={listButton}
          formButton={formButton}
        />
        {!showForm && (
          <SalesList
            sales={sales}
            contacts={contacts}
            categories={categories}
            openDeleteModal={toggleDeleteModal}
            openEditModal={toggleEditModal}
          />
        )}
        {showForm && (
          <SalesForm
            categories={categories}
            contacts={contacts}
            getFormValues={getFormValues}
            items={items}
            openCustomerForm={toggleCustomerModal}
          />
        )}
        {openCustomerForm && (
          <AddContactForm
            addHandler={addCustomerHandler}
            toggleModal={toggleCustomerModal}
          />
        )}
        {openEditModal && (
          <EditForm
            isSupply={false}
            prevData={saleToBeEditted}
            toggleModal={toggleEditModal}
            editHandler={editSaleHandler}
            contacts={contacts}
          />
        )}
        {openDeleteModal && (
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
    const contactsUrl = "http://localhost:8080/contacts";
    const salesUrl = "http://localhost:8080/sales";
    const categoriesUrl = "http://localhost:8080/categories";
    try {
      const allData = await Promise.all([
        fetchData(token, contactsUrl),
        fetchData(token, salesUrl),
        fetchData(token, categoriesUrl)
      ]);

      return {
        contacts: allData[0].data,
        sales: allData[1].data,
        categories: allData[2].data
      };
    } catch (error) {
      console.log(error);
    }
};