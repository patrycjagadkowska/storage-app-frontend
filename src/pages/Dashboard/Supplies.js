const Supplies = () => {
    return (
        <h1>Supplies Page</h1>
    );
};

export default Supplies;

export const loader = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/supplies", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    return res;
}