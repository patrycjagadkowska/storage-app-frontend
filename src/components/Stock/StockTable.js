import { useState, useEffect, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import { validateName } from "../../constants/validationFns";

import classes from "./Stock.module.css";

const StockTable = ({
  items,
  categoryName,
  categoryId,
  openEditItemModal,
  openDeleteItemModal,
  openDeleteCategoryModal,
  setCategoryToBeEditted,
  editCategory
}) => {
  const [records, setRecords] = useState([]);
  const [ editMode, setEditMode ] = useState(false);
  const [ newCategoryName, setNewCategoryName ] = useState("");
  const [ categoryNameError, setCategoryNameError ] = useState(null);

  useEffect(() => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      setRecords([]);
      return;
    }

    const mappedRecords = items.map((i) => {
      return (
        <tr key={i.id}>
          <td>{i.name}</td>
          <td>{i.quantity}</td>
          <td>{i.salePrice}</td>
          <td>
            <div className={classes["btn-cell"]}>
              <CustomButton
                onClick={() => {
                  openEditItemModal(i.id);
                }}
                className={classes["edit-btn"]}
              >
                <FaEdit />
              </CustomButton>{" "}
              <CustomButton
                onClick={() => {
                  openDeleteItemModal(i.id);
                }}
                className={classes["edit-btn"]}
              >
                <RiDeleteBinFill />
              </CustomButton>
            </div>
          </td>
        </tr>
      );
    });
    setRecords(mappedRecords);
  }, [items, openEditItemModal, openDeleteItemModal]);

const openEditCategory = () => {
  setEditMode(true);
  setCategoryToBeEditted(categoryId);
};

const getCategoryValue = useCallback(({ name, value }) => {
  setNewCategoryName(value);
}, []);

const getCategoryError = useCallback(({ name, error }) => {
  setCategoryNameError(error);
}, []);

const editCategoryHandler = (event) => {
  event.preventDefault();

  if (categoryNameError) {
    return;
  }

  editCategory(newCategoryName);
};

  return (
    <div className={classes.category}>
      <div className={classes["category__header"]}>
        {!editMode && <h4>{categoryName}</h4>}
        {editMode && (
          <div className={classes["category__header--edit"]}>
            <CustomInput
              name="name"
              label="Category name"
              id="name"
              initialValue={categoryName}
              validationFn={{ validationFn: validateName }}
              getInputValue={getCategoryValue}
              getError={getCategoryError}
              placeholder={categoryName}
              type="text"
            />
            <CustomButton
              type="submit"
              onClick={editCategoryHandler}
            >
              Save change
            </CustomButton>
            <CustomButton
              type="button"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </CustomButton>
          </div>
        )}
        <div className={classes["category__header--buttons"]}>
          <CustomButton
            className={classes["edit-btn"]}
            onClick={openEditCategory}
          >
            <FaEdit />
          </CustomButton>{" "}
          <CustomButton
            className={classes["edit-btn"]}
            onClick={() => openDeleteCategoryModal(categoryId)}
          >
            <RiDeleteBinFill />
          </CustomButton>
        </div>
      </div>
      {records.length > 0 && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{records}</tbody>
        </table>
      )}
      {records.length === 0 && <p>No records found.</p>}
    </div>
  );
};

export default StockTable;