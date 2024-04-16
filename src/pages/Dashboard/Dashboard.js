import { useLoaderData } from "react-router";
import { useReducer, useEffect } from "react";

import { initState, reducer } from "../../reducers/dashboard";
import MonthlyIncome from "../../components/Dashboard/MonthlyIncome";
import { fetchData } from "../../constants/helperFns";
import SixMonthsChart from "../../components/Dashboard/SixMonthsChart";

import classes from "./pages.module.css";

const Dashboard = () => {
    const [ state, dispatch ] = useReducer(reducer, initState);
    const loadedData = useLoaderData();

    useEffect(() => {
        if (!loadedData.data || !Array.isArray(loadedData.data) || loadedData.data.length < 2) {
            dispatch({ type: "set_monthly_income_data", data: {} });
            dispatch({ type: "set_six_months_data", data: []})
        }
        dispatch({ type: "set_monthly_income_data", data: loadedData[0].data });
        dispatch({ type: "set_six_months_data", data: loadedData[1].data })
    }, [loadedData]);

    return (
        <div className={classes.container}>
        <h1>Dashboard</h1>
        <MonthlyIncome data={state.monthlyIncomeData} />
        <SixMonthsChart data={state.sixMonthsData} />
        </div>
    );
};

export default Dashboard;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const monthlyIncomeUrl =
      "http://localhost:8080/monthly-income?year=" + year + "&month=" + month;
    const lastSixMonthsUrl =
      "http://localhost:8080/last-six-months?year=" + year + "&month=" + month;

    const allData = await Promise.all([
        fetchData(token, monthlyIncomeUrl),
        fetchData(token, lastSixMonthsUrl)
    ]);

    return allData;
};