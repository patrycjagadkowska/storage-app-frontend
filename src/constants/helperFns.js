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