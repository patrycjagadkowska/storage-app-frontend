import { useCallback, useEffect, useState } from "react";

import InventoryInput from "./InventoryInput";

const InventoryCategory = ({
  categoryTitle,
  categoryId,
  items,
  getCategoryValues,
}) => {
  const [categoryValues, setCategoryValues] = useState([]);


  const getValue = useCallback(({ itemId, value }) => {
    setCategoryValues((oldValues) => {
      const copiedValues = [...oldValues];
      const existingItemIndex = copiedValues.findIndex((v) => v.id === itemId);
      if (existingItemIndex) {
        copiedValues.splice(existingItemIndex, 1);
      }
      copiedValues.push({id: itemId, quantity: value});
      return copiedValues;
    });
  }, []);

  useEffect(() => {
    getCategoryValues({ categoryId, categoryValues });
  }, [categoryId, categoryValues, getCategoryValues]);

  const inputs =
    (items &&
      Array.isArray(items) &&
      items.map((i, index) => {
        const inputData = {
          name: i.name.toLowerCase(),
          id: i.id,
          label: i.name.charAt(0).toUpperCase() + i.name.substring(1),
          oldValue: i.quantity,
        };
        return (
          <InventoryInput
            inputData={inputData}
            getValue={getValue}
            key={`${i.name}/${index}`}
          />
        );
      })) ||
    [];

  return (
    <div>
      <h4>{categoryTitle}</h4>
      {inputs.length > 0 && <ul>{inputs}</ul>}
      {(!inputs || inputs.length === 0) && <p>No data found.</p>}
    </div>
  );
};

export default InventoryCategory;