import classes from "./Dashboard.module.css";

const StatCard = ({ children }) => {
    return (
        <section className={classes["stat-card"]}>
            { children }
        </section>
    );
};

export default StatCard;