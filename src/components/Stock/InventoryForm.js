import { useCallback, useEffect, useState } from "react";

import InventoryCategory from "./InventoryCategory";
import CustomButton from "../UI/CustomButton";

const InventoryForm = ({ categories, items, onSubmit }) => {
    const [ formValues, setFormValues ] = useState({});
    const [ formError, setFormError ] = useState(null);
    const [ inventoryCategories, setInventoryCategories ] = useState([]);

    useEffect(() => {
        const initialValues = {};
        for (const category of categories) {
            const categoryItems = items.filter((i) => i.CategoryId === category.id).map((i) => {
                return {
                    id: i.id, 
                    quantity: i.quantity
                }
            }) || {};
            initialValues[category.id] = categoryItems;
        }
        setFormValues(initialValues);
    }, [categories, items]);

    const getCategoryValues = useCallback(({ categoryId, categoryValues }) => {
        setFormValues((oldValues) => {
            const copiedValues = { ...oldValues };
            const oldCategoryValues = copiedValues[categoryId];
            for (const newItem of categoryValues) {
                const oldItem = oldCategoryValues.find((i) => i.id === newItem.id);
                oldItem.quantity = newItem.quantity;
            }
            copiedValues[categoryId] = oldCategoryValues;
            return copiedValues;
        })
    }, []);

    useEffect(() => {
        if (categories && Array.isArray(categories)) {
            const mappedCategories = categories.map((c, index) => {
                const categoryItems = items.filter((i) => i.CategoryId === c.id);
                const categoryTitle = c.name.charAt(0).toUpperCase() + c.name.substring(1);
                const categoryInitialValues = (formValues && formValues[c.id]) || [];
                return (
                  <InventoryCategory
                    categoryTitle={categoryTitle}
                    items={categoryItems}
                    getCategoryValues={getCategoryValues}
                    key={`${c.name}/${index}`}
                    categoryId={c.id}
                    categoryInitialValues={categoryInitialValues}
                  />
                );
            });
            setInventoryCategories(mappedCategories);
        } else {
            setInventoryCategories([]);
        }
    }, [categories, formValues, getCategoryValues, items]);

    const submitHandler = (event) => {
        event.preventDefault();
        setFormError(null);
        
        for (const category in formValues) {
            const categoryValues = formValues[category];
            if (categoryValues.length === 0) {
                continue;
            }
             for (const value of categoryValues) {
                const quantity = value.quantity;
                if (typeof parseInt(quantity) !== "number") {
                    setFormError("Please enter only valid numbers.");
                    break;
                }
             }
        }

        if (!formError) {
            onSubmit(formValues)
        };
    };

    return (
        <form>
            {inventoryCategories.length > 0 && (
                <ul>
                    { inventoryCategories }
                </ul>
            )}
            {(!inventoryCategories || inventoryCategories.length === 0) && <p>No data found.</p>}
            {}
            <CustomButton type="submit" onClick={submitHandler}>Save changes</CustomButton>
        </form>
    )
};

export default InventoryForm;