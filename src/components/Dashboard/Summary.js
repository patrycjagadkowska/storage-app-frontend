import { useState, useEffect } from "react";

import StatCard from "./StatCard";
import ItemsTable from "./ItemsTable";

import classes from "./Dashboard.module.css";

const Summary = ({ data }) => {
    const [ depletingInventoryData, setDepletingInventoryData ] = useState([]);
    const [ bestsellersData, setBestsellersData ] = useState([]);

    useEffect(() => {
        if (!data || typeof data !== "object") {
            setDepletingInventoryData([]);
            setBestsellersData([]);
            return;
        }

        if (!data.lowQuantityItems) {
            setDepletingInventoryData([]);
            return;
        }

        if (!data.bestsellers) {
            setBestsellersData([]);
            return;
        }

        const mappedLowQuantityItems = data.lowQuantityItems.map((item) => {
            return {
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                category: item.Category.name
            };
        });

        const mappedBestsellersData = data.bestsellers.map((item) => {
            return {
                id: item.id,
                name: item.itemName,
                quantity: item.quantity,
                category: item.categoryName
            };
        });

        setDepletingInventoryData(mappedLowQuantityItems);
        setBestsellersData(mappedBestsellersData);
    }, [data]);

    return (
      <StatCard className={classes.summary}>
        <div className={classes["summary__table"]}>
          <h3>Depleting inventory</h3>
          <ItemsTable data={depletingInventoryData} />
        </div>
        <div className={classes["summary__table"]}>
          <h3>Bestsellers</h3>
          <ItemsTable data={bestsellersData} />
        </div>
      </StatCard>
    );
};

export default Summary;