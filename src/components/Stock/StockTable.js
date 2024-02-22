import { useState, useEffect } from "react";

const StockTable = ({ items, categoryName }) => {
    const [ records, setRecords ] = useState([]);

    useEffect(() => {
        if (!items || !Array.isArray(items) || items.length === 0) {
            setRecords([]);
            return;
        }

        const mappedRecords = items.map((i) => {
            return <tr>
                <td>{i.name}</td>
                <td>{i.quantity}</td>
            </tr>
        });
        setRecords(mappedRecords);
    }, [items]);

    return (
        <>
            <h4>{categoryName}</h4>
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                { records }
            </tbody>
        </table>
        {records.length === 0 && <p>No records found.</p>}
        </>
    );
};

export default StockTable;