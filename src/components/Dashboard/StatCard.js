import classes from "./Dashboard.module.css";

const StatCard = ({ children, className }) => {
    return (
        <section className={`${classes["stat-card"]} ${className ? className : ""}`}>
            { children }
        </section>
    );
};

export default StatCard;