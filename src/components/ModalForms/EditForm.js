import CustomForm from "../UI/CustomForm";
import Modal from "../UI/Modal";
import { validateDate, validateSelect } from "../../constants/validationFns";

const EditForm = ({ prevData, toggleModal, editHandler, contacts, isSupply }) => {
    const contactName = contacts.find((c) => c.id === prevData.ContactId).name;
    const contactsOptions = contacts.map((c) => c.name);

    const inputs = [
        {
            label: "Date",
            name: "date",
            id: "date",
            initialValue: prevData.date,
            placeholder: prevData.date,
            validationFn: validateDate,
            type: "date"
        }, 
        {
            label: "Supplier",
            name: "supplier",
            id: "supplier",
            initialValue: contactName,
            placeholder: contactName,
            validationFn: validateSelect,
            type: "select",
            options: contactsOptions
        }
    ];

    return (
        <Modal toggleModal={toggleModal}>
            <h3>Edit {isSupply ? "supply" : "sale"}</h3>
            <CustomForm inputs={inputs} button="Confirm changes" onSubmit={editHandler} />
        </Modal>
    );
};

export default EditForm;