import { useLoaderData } from "react-router";
import { useReducer, useEffect } from "react";

import { initState, reducer } from "../../reducers/dashboard";
import MonthlyIncome from "../../components/Dashboard/MonthlyIncome";

const Dashboard = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedData = useLoaderData();

    useEffect(() => {
        if (!loadedData.data || !Array.isArray(loadedData.data) || loadedData.data.length < 1) {
            dispatch({ type: "set_monthly_income_data", data: [] });
        }

        dispatch({ type: "set_monthly_income_data", data: loadedData.data });
    }, [loadedData]);

    return (
        <>
        <h1>Dashboard</h1>
        <MonthlyIncome data={state.monthlyIncomeData} />
        </>
    );
};

export default Dashboard;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    return await fetch("http://localhost:8080/monthly-income?year=" + year + "&month=" + month, {
        method: "GET", 
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};