import { useLoaderData, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";

import { fetchData } from "../../constants/helperFns";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import StockList from "../../components/Stock/StockList";
import InventoryForm from "../../components/Stock/InventoryForm";
import EditItemForm from "../../components/ModalForms/EditItemForm";
import DeleteForm from "../../components/ModalForms/DeleteForm";

const Stock = () => {
    const [ showForm, setShowForm ] = useState(false);
    const [ categories, setCategories ] = useState();
    const [ items, setItems ] = useState();
    const [ chosenFilterCategory, setChosenFilterCategory ] = useState(null);
    const [ chosenDeleteItem, setChosenDeleteItem ] = useState(null);
    const [ chosenDeleteCategory, setChosenDeleteCategory ] = useState(null);
    const [ chosenEditCategory, setChosenEditCategory ] = useState(null);
    const [ openEditItemModal, setOpenEditItemModal ] = useState(false);
    const [ openDeleteItemModal, setOpenDeleteItemModal ] = useState(false);
    const [ openDeleteCategoryModal, setOpenDeleteCategoryModal ] = useState(false);
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadedData || !Array.isArray(loadedData) || loadedData.length !== 2) {
            setCategories([]);
            setItems([]);
            return;
        }

        setCategories(loadedData[0].data);
        setItems(loadedData[1].data);
    }, [loadedData]);

    useEffect(() => {
        const category =
          (categories &&
            categories.find((c) => c.name === chosenFilterCategory)) ||
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
    }, [chosenFilterCategory, categories]);

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
            setChosenFilterCategory(value);
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

    const chosenItemPrevData =
      chosenDeleteItem && items && items.find((i) => i.id === chosenDeleteItem);

    const toggleEditItemModal = () => {
        setOpenEditItemModal((prevState) => !prevState);
    };

    const openEditItemModalHandler = (itemId) => {
        setChosenDeleteItem(itemId);
        setOpenEditItemModal(true);
    };

    const toggleDeleteItemModal = () => {
        setOpenDeleteItemModal((prevState) => !prevState);
    };

    const openDeleteItemModalHandler = (itemId) => {
        setChosenDeleteItem(itemId);
        setOpenDeleteItemModal(true);
    };

    const toggleDeleteCategoryModal = () => {
        setOpenDeleteCategoryModal((prevState) => !prevState);
    };

    const openDeleteCategoryModalHandler = (categoryId) => {
        setChosenDeleteCategory(categoryId);
        setOpenDeleteCategoryModal(true);
    };

    const editItemHandler = async (formData) => {
        const token = localStorage.getItem("token");
        const name = formData.name || chosenItemPrevData.name;
        const salePrice = formData.salePrice || chosenItemPrevData.salePrice;
        const quantity = formData.quantity || chosenItemPrevData.quantity;
        const categoryId = chosenItemPrevData.CategoryId;
        
        try {
            const res = await fetch("http://localhost:8080/editItem/" + chosenDeleteItem, {
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

    const deleteItemHandler = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/deleteItem/" + chosenDeleteItem, {
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

    const deleteCategoryHandler = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/deleteCategory/" + chosenDeleteCategory, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
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

    const setCategoryToBeEditted = (categoryId) => {
        setChosenEditCategory(categoryId);
    };

    const editCategoryHandler = async (newName) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/editCategory/" + chosenEditCategory, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ categoryName: newName })
            });

            if (res.status === 200 || res.status === 201) {
                navigate(0);
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            openDeleteItemModal={openDeleteItemModalHandler}
            openDeleteCategoryModal={openDeleteCategoryModalHandler}
            editCategoryHandler={editCategoryHandler}
            setCategoryToBeEditted={setCategoryToBeEditted}
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
        {!showForm && openDeleteItemModal && (
          <DeleteForm
            deleteItemName="item"
            toggleModal={toggleDeleteItemModal}
            deleteHandler={deleteItemHandler}
          />
        )}
        {!showForm && openDeleteCategoryModal && (
          <DeleteForm
            deleteItemName="category"
            toggleModal={toggleDeleteCategoryModal}
            deleteHandler={deleteCategoryHandler}
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

    const allData = await Promise.all([
      fetchData(token, categoriesUrl),
      fetchData(token, itemsUrl),
    ]);

    return allData;
};