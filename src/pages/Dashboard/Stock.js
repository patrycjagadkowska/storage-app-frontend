import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";

import { fetchData } from "../../constants/helperFns";

const Stock = () => {
    const [ categories, setCategories ] = useState();
    const [ items, setItems ] = useState();
    const loadedData = useLoaderData();

    useEffect(() => {
        if (loadedData && loadedData.categories && Array.isArray(loadedData.categories)) {
            setCategories(loadedData.categories);
        } 

        if (loadedData && loadedData.items && Array.isArray(loadedData.items)) {
            setItems(loadedData.items);
        }
    }, [loadedData]);
    
    return (
        <h1>Stock</h1>
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