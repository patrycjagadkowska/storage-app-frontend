import { PieChart, Pie, Tooltip } from "recharts";

import StatCard from "./StatCard";

import classes from "./Dashboard.module.css";

const MonthPieChart = ({ data, title }) => {
    return (
      <StatCard className={classes["monthly-sales"]}>
        <h2>{title}</h2>
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </StatCard>
    );
};

export default MonthPieChart;