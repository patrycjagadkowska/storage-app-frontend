import { useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useNavigate } from "react-router";

import CustomForm from "../UI/CustomForm";
import CustomButton from "../UI/CustomButton";
import ItemsList from "../UI/ItemsList";
import { validateDate, validateSelect } from "../../constants/validationFns";

const SuppliesForm = ({
  categories,
  updateCategories,
  contacts,
  updateContacts,
  items,
  updateItems,
  getFormValues,
}) => {
  const [firstFormFilled, setFirstFormFilled] = useState(false);
  const [supplyData, setSupplyData] = useState({
    date: "",
    supplier: "",
    items: [],
  });
  const [ formError, setFormError ] = useState(false);
  const navigate = useNavigate();

  const resetError = () => {
    setFormError(false);
  };

  const contactsOptions = contacts.map((contact) => contact.name);
  const categoriesOptions = categories.map((category) => category.name);
  const itemsOptions = items.map((item) => item.name);

  const firstInputs = [
    {
      label: "Date",
      id: "date",
      type: "date",
      name: "date",
      initialValue: supplyData.date,
      validationFn: validateDate,
    },
    {
      label: "Suppliers",
      id: "suppliers",
      name: "suppliers",
      type: "select",
      initialValue: supplyData.supplier,
      options: contactsOptions,
      addOption: {
        handler: updateContacts,
        icon: <MdOutlinePlaylistAdd />,
        button: "Add supplier",
      },
      validationFn: validateSelect,
    },
  ];
  const firstSubmitHandler = (formValues) => {
    if (formValues.date === "" || !formValues.date) {
      setFormError("Please enter a valid date");
      return;
    }

    if (formValues.suppliers === "" || !formValues.suppliers) {
      setFormError("Please choose a  supplier.");
      return;
    }

    setSupplyData((prevData) => {
      return {
        ...prevData,
        date: formValues.date,
        supplier: formValues.suppliers,
      };
    });
    setFirstFormFilled(true);
  };

  const secondInputs = [
    {
      label: "Category",
      name: "category",
      id: "category",
      type: "select",
      initialValue: "",
      options: categoriesOptions,
      addOption: {
        icon: <MdOutlinePlaylistAdd />,
        button: "Add category",
        handler: updateCategories,
      },
      validationFn: () => {
        return false;
      },
    },
    {
      label: "Item",
      name: "item",
      id: "item",
      type: "select",
      initialValue: "",
      options: itemsOptions,
      addOption: {
        icon: <MdOutlinePlaylistAdd />,
        button: "Add item",
        handler: updateItems,
      },
      validationFn: () => {
        return false;
      },
    },
    {
      label: "Quantity",
      name: "quantity",
      id: "quantity",
      type: "number",
      initialValue: 0,
      validationFn: (value) => {
        return value <= 0;
      },
    },
    {
      label: "Price",
      name: "price",
      id: "price",
      type: "text",
      initialValue: "",
      validationFn: () => {
        return false;
      },
    },
  ];

  const backToFirstForm = () => {
    setFirstFormFilled(false);
  };

  const secondSubmitHandler = (formValues) => {
    const { category, item, quantity, price } = formValues;

    if (!category || category === "") {
      setFormError("Please choose a category.");
      return;
    }

    if (!item || item === "") {
      setFormError("Please choose an item name.");
      return;
    }

    if (parseInt(quantity) <= 0) {
      setFormError("Please enter a valid quantity");
      return;
    }

    if (parseFloat(price) <= 0) {
      setFormError("Please enter a valid price");
      return;
    }

    setSupplyData((prevData) => {
      const prevItems = [...prevData.items];
      const existingItem = prevItems.find((item) => {
        return item.item === formValues.name;
      });
      if (existingItem) {
        console.log("Item already added");
        return;
      }

      prevItems.push(formValues);

      return {
        ...prevData,
        items: prevItems,
      };
    });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (formError) {
      return;
    }

    if (supplyData.items.length === 0) {
      setFormError("Please add items to supply.");
      return;
    }
    
    const supplierId = contacts.find((c) => c.name === supplyData.supplier).id;

    if (!supplierId) {
      console.log("Supplier Id not found.");
    }

    const supplyItems = supplyData.items.map((i) => {
        return {
          itemName: i.item,
          purchasePrice: i.price,
          quantity: i.quantity
        };
    })

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/addSupply", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ supplierId, items: supplyItems, date: supplyData.date }),
      });
      if (res.status === 200 || res.status === 201) {
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={resetError}>
      {!firstFormFilled && (
        <CustomForm
          inputs={firstInputs}
          onSubmit={firstSubmitHandler}
          button="Next"
          formError={formError}
        />
      )}
      {firstFormFilled && (
        <CustomForm
          inputs={secondInputs}
          onSubmit={secondSubmitHandler}
          button="Add item"
          getFormValues={getFormValues}
          formError={formError}
        />
      )}
      {firstFormFilled && supplyData.items.length > 0 && (
        <ItemsList supplyItems={supplyData.items} title="Added items" />
      )}
      {firstFormFilled && (
        <>
        <CustomButton onClick={backToFirstForm}>Back</CustomButton>
        <CustomButton onClick={submitFormHandler}>Add supply</CustomButton>
        </>
      )}
    </div>
  );
};

export default SuppliesForm;