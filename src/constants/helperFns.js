export const fetchData = async (token, url) => {
    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        if (!res.ok) {
            throw new Error("Something went wrong while fetching data");
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
};

export const checkIfEmpty = (values) => {
    let isError;
    for (const value of values) {
        const type = typeof value;
        if (type === undefined || null) {
            isError = true;
            break;
        } else if (type === "string" && value.trim() === "") {
            isError = true;
            break;
        } 
    }
    return isError;
};