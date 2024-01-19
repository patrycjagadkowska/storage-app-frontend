import classes from "./styles/CustomList.module.css";

const CustomListItem = ({ title, children }) => {
    return (
        <li className={classes.item}>
            <h3 className={classes["item__title"]}>
                { title }
            </h3>
            <div className={classes["item__children"]}>
                { children }
            </div>
        </li>
    );
};

export default CustomListItem;