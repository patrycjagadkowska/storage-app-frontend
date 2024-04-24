import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

import SettingsForm from "../../components/Settings/SettingsForm";
import { validateTokenExpiration } from "../../constants/validationFns";

const Settings = () => {
    const [ formError, setFormError ] = useState(false);
    const [ oldValues, setOldValues ] = useState({})
    const loaderData = useLoaderData();

    useEffect(() => {
        if (loaderData) {
            setOldValues(loaderData.data);
        }
    }, [loaderData]);

    return (
        <>
            <SettingsForm oldValues={oldValues} setFormError={setFormError} />
            <span>{ formError }</span>
        </>
    );
};

export default Settings;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const tokenNotExpired = validateTokenExpiration(expiresIn);

    if (!tokenNotExpired) {
        const error = new Error("Token expired. Please login again.");
        error.status = 401;
        throw error;
    }
    

    const res = await fetch("http://localhost:8080/userData", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    return res;
};