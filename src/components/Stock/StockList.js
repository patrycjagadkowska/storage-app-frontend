import { useState, useEffect } from "react";

import FilterForm from "../UI/FilterForm";
import { validateName, validateSelect } from "../../constants/validationFns";
import StockTable from "./StockTable";

import classes from "./Stock.module.css";

const StockList = ({
  categories,
  items,
  onChangeHandler,
  onErrorHandler,
  openEditItemModal,
  openDeleteItemModal,
  openDeleteCategoryModal,
  editCategoryHandler,
  setCategoryToBeEditted,
  chosenFilterCategory
}) => {
  const [categoriesTables, setCategoriesTables] = useState([]);

  useEffect(() => {
    if (
      !categories ||
      !items ||
      !Array.isArray(categories) ||
      !Array.isArray(items) ||
      categories.length === 0 ||
      items.length === 0
    ) {
      setCategoriesTables([]);
      return;
    }

    let categoriesToMap;

    if (chosenFilterCategory) {
      categoriesToMap = [categories.find((c) => c.name === chosenFilterCategory)];
    } else {
      categoriesToMap = categories;
    }

    const mappedCategories = categoriesToMap.map((c) => {
      const categoryItems = items.filter((i) => i.CategoryId === c.id);
      return (
        <StockTable
          categoryName={c.name}
          categoryId={c.id}
          key={c.id}
          items={categoryItems}
          openEditItemModal={openEditItemModal}
          openDeleteItemModal={openDeleteItemModal}
          openDeleteCategoryModal={openDeleteCategoryModal}
          editCategory={editCategoryHandler}
          setCategoryToBeEditted={setCategoryToBeEditted}
        />
      );
    });
    setCategoriesTables(mappedCategories);
  }, [
    categories,
    items,
    openEditItemModal,
    openDeleteItemModal,
    openDeleteCategoryModal,
    editCategoryHandler,
    setCategoryToBeEditted,
    chosenFilterCategory
  ]);

  const categoriesOptions =
    (categories &&
      Array.isArray(categories) &&
      categories.map((c) => c.name)) ||
    [];

  const filters = [
    {
      name: "category",
      label: "Category",
      id: "category",
      initialValue: "",
      validationFn: { validationFn: validateSelect, data: categoriesOptions },
      type: "select",
      options: categoriesOptions,
    },
    {
      name: "itemName",
      label: "Item",
      id: "itemName",
      initialValue: "",
      validationFn: { validationFn: validateName },
      type: "text",
    },
  ];

  return (
    <>
      <FilterForm
        filters={filters}
        onChange={onChangeHandler}
        onError={onErrorHandler}
      />
      <h3 className={classes.title}>Your stock</h3>
      {categoriesTables}
    </>
  );
};

export default StockList;