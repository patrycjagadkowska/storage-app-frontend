import { useLoaderData } from "react-router";
import { useState, useEffect, useCallback } from "react";

import { fetchData } from "../../constants/helperFns";
import HeaderWithButtons from "../../components/UI/HeaderWithButons";
import StockList from "../../components/Stock/StockList";

const Stock = () => {
    const [ showForm, setShowForm ] = useState(false);
    const [ categories, setCategories ] = useState();
    const [ items, setItems ] = useState();
    const [ chosenCategory, setChosenCategory ] = useState(null);
    const loadedData = useLoaderData();

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
        }
    }, []);

    const onErrorHandler = useCallback(({ name, value }) => {

    }, []);

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