import { useState, useEffect, useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router";

import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import SuppliesList from "../../components/Supplies/SuppliesList";
import SuppliesForm from "../../components/Supplies/SuppliesForm";
import { fetchData } from "../../constants/helperFns";
import AddCategoryForm from "../../components/Supplies/AddCategoryForm";
import AddItemForm from "../../components/Supplies/AddItemForm";
import AddSupplierForm from "../../components/Supplies/AddSupplierForm";
import DeleteSupplyForm from "../../components/Supplies/DeleteSupplyForm";

const Supplies = () => {
    const [ supplies, setSupplies ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ contacts, setContacts ] = useState([]);
    const [ items, setItems ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const [ showCategoryModal, setShowCategoryModal ] = useState(false);
    const [ showItemModal, setShowItemModal ] = useState(false);
    const [ showSupplierModal, setShowSupplierModal ] = useState(false);
    const [ showDeleteSupplyModal, setShowDeleteSupplyModal ] = useState(false);
    const [ chosenSupply, setChosenSupply ] = useState(null);
    const [ chosenCategory, setChosenCategory ] = useState(null);
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    const getFormValues = useCallback((formValues) => {
        setChosenCategory(formValues.category);
    }, []);
    
    useEffect(() => {
        if (loadedData) {
            const { supplies, categories, contacts } = loadedData;
            setSupplies(supplies.data);
            setCategories(categories.data);
            setContacts(contacts.data);
        }
    }, [loadedData]);

    useEffect(() => {
        if (!chosenCategory || chosenCategory === "") {
          return;
        }
        const token = localStorage.getItem("token");
        const fetchItems = async (id) => {
          try {
            const fetchedItems = await fetchData(
              token,
              "http://localhost:8080/categories/" + id
            );
            setItems(fetchedItems.data);
          } catch (error) {
            console.log(error);
          }
        };
        const categoryId = categories.find((cat) => cat.name === chosenCategory).id;
        fetchItems(categoryId);
      }, [chosenCategory, categories]);

    const showListHandler = () => {
        setShowForm(false);
    };
    
    const showFormHandler = () => {
        setShowForm(true);
    };

    const listButton = {
        handler: showListHandler,
        text: "Show all supplies"
    };

    const formButton = {
        handler: showFormHandler,
        text: "Add supply"
    };

    const toggleCategoryModal = () => {
        setShowCategoryModal((prevState) => !prevState);
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
                setCategories((prevState) => {
                    const catArray = [...prevState];
                    catArray.push(category);
                    return catArray;
                });
            }
            setShowCategoryModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleItemModal = () => {
        setShowItemModal((prevState) => !prevState);
    };

    const addItemHandler = async (item) => {
        const token = localStorage.getItem("token");

        if (!chosenCategory) {
            console.log("Choose category first");
            return;
        }
        const categoryId = categories.find((cat) => cat.name === chosenCategory).id;

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
                setItems((prevState) => {
                    const itemsArray = [...prevState];
                    itemsArray.push(newItem);
                    return itemsArray;
                });
            }
            setShowItemModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleSupplierModal = () => {
        setShowSupplierModal((prevState) => !prevState);
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
                setContacts((prevState) => {
                    const contactsArray = [...prevState];
                    contactsArray.push(newContact);
                    return contactsArray;
                });
            }
            setShowSupplierModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleDeleteSupplyModal = () => {
      setShowDeleteSupplyModal((prevState) => !prevState);
    };

    const openDeleteFormHandler = (supplyId) => {
      setShowDeleteSupplyModal(true);
      setChosenSupply(supplyId);
    };

    const deleteSupplyHandler = async () => {
        if (!chosenSupply) {
          console.log("No category chosen");
        }

        const token = localStorage.getItem("token");

        try {
          const res = await fetch("http://localhost:8080/deleteSupply/"+ chosenSupply, {
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
    }

    return (
      <>
        <HeaderWithButtons
          header="Supplies"
          listButton={listButton}
          formButton={formButton}
        />
        {!showForm && (
          <SuppliesList
            supplies={supplies}
            contacts={contacts}
            categories={categories}
            openDeleteForm={openDeleteFormHandler}
          />
        )}
        {showForm && (
          <SuppliesForm
            categories={categories}
            contacts={contacts}
            items={items}
            updateCategories={toggleCategoryModal}
            updateItems={toggleItemModal}
            updateContacts={toggleSupplierModal}
            getFormValues={getFormValues}
          />
        )}
        {showCategoryModal && !showItemModal && !showSupplierModal && (
          <AddCategoryForm
            toggleModal={toggleCategoryModal}
            addCategoryHandler={addCategoryHandler}
          />
        )}
        {showItemModal && !showCategoryModal && !showSupplierModal && (
          <AddItemForm
            toggleModal={toggleItemModal}
            addItemHandler={addItemHandler}
          />
        )}
        {showSupplierModal && !showCategoryModal && !showItemModal && (
          <AddSupplierForm
            toggleModal={toggleSupplierModal}
            addSupplierHandler={addSupplierHandler}
          />
        )}
        {
          showDeleteSupplyModal &&
          <DeleteSupplyForm
          toggleModal={toggleDeleteSupplyModal}
          deleteSupply={deleteSupplyHandler}
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

    try {
        const allData = await Promise.all([
          fetchData(token, suppliesUrl),
          fetchData(token, categoriesUrl),
          fetchData(token, contactsUrl),
        ]);

        return {
            supplies: allData[0],
            categories: allData[1],
            contacts: allData[2]
        };
    } catch (error) {
        console.log(error);
    }    
};