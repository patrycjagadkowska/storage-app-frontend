import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useCallback, useReducer } from "react";

import { fetchData } from "../../constants/helperFns";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import StockList from "../../components/Stock/StockList";
import InventoryForm from "../../components/Stock/InventoryForm";
import EditItemForm from "../../components/ModalForms/EditItemForm";
import DeleteForm from "../../components/ModalForms/DeleteForm";
import { initState, reducer } from "../../reducers/stock";

const Stock = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedData = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadedData || !Array.isArray(loadedData) || loadedData.length !== 2) {
            dispatch({ type: "set_categories", data: [] });
            dispatch({ type: "set_items", data: [] });
            return;
        }

        dispatch({ type: "set_categories", data: loadedData[0].data });
        dispatch({ type: "set_items", data: loadedData[1].data });
    }, [loadedData]);

    const listButton = {
        handler: () => {dispatch({ type: "hide_form" })},
        text: "Show all stock"
    };

    const formButton = {
        handler: () => {dispatch({ type: "display_form" })},
        text: "Take inventory"
    };

    const onFilterChangeHandler = useCallback(({ name, value }) => {
        if (name === "category") {
            dispatch({ type: "set_filter_category", data: value });           
        } else if (name === "itemName" && value.length > 0) {
            const filteredItems = state.items && state.items.filter((i) => {
                return i.name.toLowerCase().includes(value.toLowerCase())
            });
            dispatch({ type: "set_items", data: filteredItems });
        } else if (name === "itemName" && value === "") {
            dispatch({ type: "set_items", data: loadedData[1].data });
        }
    }, [loadedData, state.items]);

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
      state.chosenItem && state.items && state.items.find((i) => i.id === state.chosenItem);

    const toggleEditItemModal = () => {
        const data = state.openModal === "edit_item" ? null : "edit_item";
        dispatch({ type: "set_modal", data });
    };

    const openEditItemModalHandler = (itemId) => {
        dispatch({ type: "set_item", data: itemId })
        dispatch({ type: "set_modal", data: "edit_item" });
    };

    const toggleDeleteItemModal = () => {
        const data = state.openModal === "delete_item" ? null : "delete_item";
        dispatch({ type: "set_modal", data });
    };

    const openDeleteItemModalHandler = (itemId) => {
        dispatch({ type: "set_item", data: itemId })
        dispatch({ type: "set_modal", data: "delete_item" });
    };

    const toggleDeleteCategoryModal = () => {
        const data = state.openModal === "delete_category" ? null : "delete_category";
        dispatch({ type: "set_modal", data });
    };

    const openDeleteCategoryModalHandler = (categoryId) => {
        dispatch({ type: "set_category", data: categoryId });
        dispatch({ type: "set_modal", data: "delete_category" });
    };

    const editItemHandler = async (formData) => {
        const token = localStorage.getItem("token");
        const name = formData.name || chosenItemPrevData.name;
        const salePrice = formData.salePrice || chosenItemPrevData.salePrice;
        const quantity = formData.quantity || chosenItemPrevData.quantity;
        const categoryId = chosenItemPrevData.CategoryId;
        
        try {
            const res = await fetch("http://localhost:8080/editItem/" + state.chosenItem, {
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
            const res = await fetch("http://localhost:8080/deleteItem/" + state.chosenItem, {
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
            const res = await fetch("http://localhost:8080/deleteCategory/" + state.chosenCategory, {
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
        dispatch({ type: "set_category", data: categoryId });
    };

    const editCategoryHandler = async (newName) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:8080/editCategory/" + state.chosenCategory, {
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
        {!state.showForm && (
          <StockList
            onChangeHandler={onFilterChangeHandler}
            items={state.items}
            categories={state.categories}
            chosenFilterCategory={state.chosenFilterCategory}
            onErrorHandler={onErrorHandler}
            openEditItemModal={openEditItemModalHandler}
            openDeleteItemModal={openDeleteItemModalHandler}
            openDeleteCategoryModal={openDeleteCategoryModalHandler}
            editCategoryHandler={editCategoryHandler}
            setCategoryToBeEditted={setCategoryToBeEditted}
          />
        )}
        {state.showForm && (
          <InventoryForm
            categories={state.categories}
            items={state.items}
            onSubmit={submitHandler}
          />
        )}
        {!state.showForm && state.openModal === "edit_item" && (
          <EditItemForm
            toggleModal={toggleEditItemModal}
            editHandler={editItemHandler}
            prevData={chosenItemPrevData}
          />
        )}
        {!state.showForm && state.openModal === "delete_item" && (
          <DeleteForm
            deleteItemName="item"
            toggleModal={toggleDeleteItemModal}
            deleteHandler={deleteItemHandler}
          />
        )}
        {!state.showForm && state.openModal === "delete_category" && (
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