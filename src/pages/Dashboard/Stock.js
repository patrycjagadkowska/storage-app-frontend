import { useLoaderData, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";

import { fetchData } from "../../constants/helperFns";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import StockList from "../../components/Stock/StockList";
import InventoryForm from "../../components/Stock/InventoryForm";
import EditItemForm from "../../components/ModalForms/EditItemForm";

const Stock = () => {
    const [ showForm, setShowForm ] = useState(false);
    const [ categories, setCategories ] = useState();
    const [ items, setItems ] = useState();
    const [ chosenCategory, setChosenCategory ] = useState(null);
    const [ chosenItem, setChosenItem ] = useState(null);
    const [ openEditItemModal, setOpenEditItemModal ] = useState(false);
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (loadedData && loadedData.categories && Array.isArray(loadedData.categories)) {
            setCategories(loadedData.categories);
        } 

        if (loadedData && loadedData.items && Array.isArray(loadedData.items)) {
            setItems(loadedData.items);
        }
    }, [loadedData]);

    useEffect(() => {
        const category =
          (categories &&
            categories.find((c) => c.name === chosenCategory)) ||
          null;
        const token = localStorage.getItem("token");
        const fetchCategoryItems = async () => {
            const res = await fetch("http://localhost:8080/categories/" + category.id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (res.status === 200) {
                const items = await res.json();
                setItems(items.data);
            }
        };

        if (category && category.id) {
            fetchCategoryItems();
        }
    }, [chosenCategory, categories]);

    const listButton = {
        handler: () => {setShowForm(false)},
        text: "Show all stock"
    };

    const formButton = {
        handler: () => {setShowForm(true)},
        text: "Take inventory"
    };

    const onFilterChangeHandler = useCallback(({ name, value }) => {
        if (name === "category") {
            setChosenCategory(value);
        } else if (name === "itemName" && value.length > 0) {
            setItems((prevItems) => {
                const filteredItems =
                  prevItems &&
                  prevItems.filter((i) =>
                    i.name.toLowerCase().includes(value.toLowerCase())
                  );
                return filteredItems;
            });
        } else if (name === "itemName" && value === "") {
            setItems(loadedData.items);
        }
    }, [loadedData.items]);

    const onErrorHandler = useCallback(({ name, value }) => {

    }, []);

    const submitHandler = async (formValues) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/addInventory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({formValues})
            });

            if (res.status === 200 || res.status === 201) {
                navigate(0);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const chosenItemPrevData = (chosenItem && items) && items.find((i) => i.id === chosenItem);

    const toggleEditItemModal = () => {
        setOpenEditItemModal((prevState) => !prevState);
    };

    const openEditItemModalHandler = (itemId) => {
        setChosenItem(itemId);
        setOpenEditItemModal(true);
    }

    const editItemHandler = async (formData) => {
        const token = localStorage.getItem("token");
        const name = formData.name || chosenItemPrevData.name;
        const salePrice = formData.salePrice || chosenItemPrevData.salePrice;
        const quantity = formData.quantity || chosenItemPrevData.quantity;
        const categoryId = chosenItemPrevData.CategoryId;
        
        try {
            const res = await fetch("http://localhost:8080/editItem/" + chosenItem, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ name, quantity, salePrice, categoryId })
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
    return (
      <>
        <HeaderWithButtons
          header="Stock"
          listButton={listButton}
          formButton={formButton}
        />
        {!showForm && (
          <StockList
            onChangeHandler={onFilterChangeHandler}
            items={items}
            categories={categories}
            onErrorHandler={onErrorHandler}
            openEditItemModal={openEditItemModalHandler}
          />
        )}
        {showForm && (
          <InventoryForm
            categories={categories}
            items={items}
            onSubmit={submitHandler}
          />
        )}
        {!showForm && openEditItemModal && (
          <EditItemForm
            toggleModal={toggleEditItemModal}
            editHandler={editItemHandler}
            prevData={chosenItemPrevData}
          />
        )}
      </>
    );
};

export default Stock;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const categoriesUrl = "http://localhost:8080/categories";
    const itemsUrl = "http://localhost:8080/categories/items";

    try {
        const allData = await Promise.all([
            fetchData(token, categoriesUrl),
            fetchData(token, itemsUrl)
        ]);

        return {
            categories: allData[0].data,
            items: allData[1].data
        };
    } catch (error) {
        console.log(error);
    }
};