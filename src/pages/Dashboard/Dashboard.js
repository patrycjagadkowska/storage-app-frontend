import { useLoaderData } from "react-router";
import { useReducer, useEffect } from "react";

import { initState, reducer } from "../../reducers/dashboard";
import MonthlyIncome from "../../components/Dashboard/MonthlyIncome";

const Dashboard = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedData = useLoaderData();

    console.log(state.monthlyIncomeData);

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

    return await fetch("http://localhost:8080/monthly-income?year=2024&month=2", {
        method: "GET", 
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};