import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import CustomButton from "./CustomButton";

import classes from "./styles/ComplexList.module.css";

const ListHeader = ({ header, editHandler, deleteHandler }) => {
  return (
    <div className={classes["list-header"]}>
      <h3>{header}</h3>
      <div className={classes["list-header__handlers"]}>
        <CustomButton
          className={classes["list-header__handler"]}
          onClick={editHandler}
        >
          <FaEdit /> <span>Edit</span>
        </CustomButton>
        <CustomButton
          className={classes["list-header__handler"]}
          onClick={deleteHandler}
        >
          <RiDeleteBinFill /> <span>Delete</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default ListHeader;
