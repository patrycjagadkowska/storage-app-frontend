import StatCard from "./StatCard";

import classes from "./Dashboard.module.css";

const MonthlyIncome = ({ data }) => {
    return (
      <StatCard className={classes["monthly-income"]}>
        <h3 className={classes.header}>Monthly Income</h3>
        <div className={classes["financial-summary"]}>
          <div className={classes["financial-summary__col"]}>
            <span>Sales:</span>
            <span>Expenses:</span>
          </div>
          <div className={classes["financial-summary__col"]}>
            <span>{data.totalSales}</span>
            <span>{data.totalExpenses}</span>
          </div>
          <div className={classes["vertical-line"]} />
          <div className={classes["financial-summary__col"]}>
            <span>Profit Margin:</span>
          </div>
          <div className={classes["financial-summary__col"]}>
            <span>{data.profitMargin}</span>
          </div>
        </div>
        <div className={classes["warehouse-summary"]}>
          <h4>Warehouse Value:</h4>
          <span>{data.warehouseValue}</span>
        </div>
      </StatCard>
    );
};

export default MonthlyIncome;