import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";


import { fetchData } from "../../constants/helperFns";

const Sales = () => {
    const [ sales, setSales ] = useState([]);
    const loadedSales = useLoaderData();

    useEffect(() => {
        if (!loadedSales || !Array.isArray(loadedSales) || loadedSales.length === 0) {
            setSales([]);
        }

        setSales(loadedSales.sales);
    }, [loadedSales]);

    return (
        <h1>Sales</h1>
    );

};

export default Sales;

export const loader = async () => {
    const token = localStorage.getItem("token");
    return fetchData(token, "http://localhost:8080/sales");
};