import Modal from "../UI/Modal";
import CustomForm from "../UI/CustomForm";
import { validateContactName, validateOptionalEmail, validatePhone, validateAddress } from "../../constants/validationFns";

const AddSupplierForm = ({ toggleModal, addSupplierHandler }) => {
    const inputs = [
        {
            label: "Name",
            name: "name",
            id: "name",
            validationFn: validateContactName,
            initialValue: "",
            type: "text",
        },
        {
            label: "Email",
            name: "email",
            id: "email",
            validationFn: validateOptionalEmail,
            initialValue: "",
            type: "email",
        },
        {
            label: "Phone",
            name: "phone",
            id: "phone",
            validationFn: validatePhone,
            type: "text",
            initialValue: ""
        },
        {
            label: "Address",
            name: "address",
            id: "address",
            validationFn: validateAddress,
            initialValue: ""
        }
    ];

    return (
        <Modal toggleModal={toggleModal}>
            <h3>Add new supplier</h3>
            <CustomForm inputs={inputs} onSubmit={addSupplierHandler} button="Add" />
        </Modal>
    );
};

export default AddSupplierForm;