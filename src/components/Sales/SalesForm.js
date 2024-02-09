import { useState } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useNavigate } from "react-router";

import CustomForm from "../UI/CustomForm";
import CustomButton from "../UI/CustomButton";
import ItemsList from "../UI/ItemsList";
import {
  validateDate,
  validateSelect,
  validatePrice,
  validateQuantity,
} from "../../constants/validationFns";

const SalesForm = ({
  contacts,
  categories,
  items,
  getFormValues,
  openCustomerForm,
}) => {
  const [formError, setFormError] = useState(null);
  const [firstFormFilled, setFirstFormFilled] = useState(false);
  const [formValues, setFormValues] = useState({
    date: "",
    customer: "",
    items: [],
  });
  const navigate = useNavigate();

  const customerOptions = contacts.map((c) => c.name);
  const categoriesOptions = categories.map((c) => c.name);
  const itemsOptions = items.map((i) => i.name);

  const backToFirstForm = () => {
    setFirstFormFilled(false);
  };

  const firstInputs = [
    {
      type: "date",
      name: "date",
      id: "date",
      label: "Date",
      validationFn: validateDate,
      initialValue: formValues.date,
    },
    {
      type: "select",
      name: "customer",
      id: "customer",
      label: "Customer",
      validationFn: validateSelect,
      initialValue: formValues.customer,
      options: customerOptions,
      addOption: {
        icon: <MdOutlinePlaylistAdd />,
        button: "Add customer",
        handler: openCustomerForm,
      },
    },
  ];

  const firstFormHandler = (inputValues) => {
    if (!inputValues.date || inputValues.date === "") {
      setFormError("Please choose a date.");
      return;
    }
    if (!inputValues.customer || inputValues.customer === "") {
      setFormError("Please choose a customer from a list or add a new one.");
      return;
    }

    setFormValues((oldValues) => {
      return {
        ...oldValues,
        date: inputValues.date,
        customer: inputValues.customer,
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
      options: categoriesOptions,
      validationFn: validateSelect,
      initialValue: "",
    },
    {
      label: "Item name",
      name: "name",
      id: "name",
      type: "select",
      options: itemsOptions,
      validationFn: validateSelect,
      initialValue: "",
    },
    {
      label: "Price",
      name: "price",
      id: "price",
      type: "text",
      validationFn: validatePrice,
      initialValue: "",
    },
    {
      label: "Quantity",
      name: "quantity",
      id: "quantity",
      type: "number",
      validationFn: validateQuantity,
      initialValue: 0,
    },
  ];

  const secondFormHandler = (inputValues) => {
    setFormError(null);
    if (!inputValues.category || inputValues.category === "") {
      setFormError("Please choose a category.");
      return;
    }

    if (!inputValues.name || inputValues.name === "") {
      setFormError("Please choose an item name.");
      return;
    }

    if (!inputValues.quantity || inputValues.quantity === 0) {
      setFormError("Please type in item's quantity.");
      return;
    }

    if (!inputValues.price || inputValues.price === "") {
      setFormError("Please type in item's price.");
      return;
    }

    setFormValues((oldValues) => {
      const itemsArray = [...oldValues.items];
      itemsArray.push(inputValues);
      return { ...oldValues, items: itemsArray };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (formError) {
      return;
    }

    if (formValues.length === 0) {
      setFormError("Please add any items.");
    }

    try {
      const token = localStorage.getItem("token");

      const customerId = contacts.find(
        (c) => c.name === formValues.customer
      ).id;
      const mappedItems = formValues.items.map((i) => {
        return {
          categoryName: i.category,
          itemName: i.name,
          price: i.price,
          quantity: i.quantity,
        };
      });

      const res = await fetch("http://localhost:8080/addSale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          customerId,
          date: formValues.date,
          items: mappedItems,
        }),
      });

      if (res.status === 200 || res.status === 201) {
        navigate(0);
      } else {
        console.log("There was a problem while adding data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!firstFormFilled && (
        <CustomForm
          inputs={firstInputs}
          onSubmit={firstFormHandler}
          button="Next"
          formError={formError}
        />
      )}
      {firstFormFilled && (
        <CustomForm
          inputs={secondInputs}
          onSubmit={secondFormHandler}
          button="Add item"
          getFormValues={getFormValues}
          formError={formError}
        />
      )}
      {firstFormFilled && <ItemsList itemsArray={formValues.items} />}
      {firstFormFilled && (
        <CustomButton onClick={backToFirstForm} type="button">
          Back
        </CustomButton>
      )}
      {firstFormFilled && (
        <CustomButton type="submit" onClick={formSubmitHandler}>
          Add sale
        </CustomButton>
      )}
    </>
  );
};

export default SalesForm;