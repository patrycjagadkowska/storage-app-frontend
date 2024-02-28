import CustomForm from "../UI/CustomForm";
import Modal from "../UI/Modal";
import { validatePrice, validateName, validateQuantity } from "../../constants/validationFns";

const EditItemForm = ({ prevData, toggleModal, editHandler }) => {
    const inputs = [
        {
            name: "name",
            label: "Name", 
            id: "name", 
            placeholder: prevData.name,
            validationFn: validateName,
            type: "text"
        },
        {
            name: "quantity",
            label: "Quantity",
            id: "quantity",
            placeholder: prevData.quantity,
            validationFn: validateQuantity,
            type: "number"
        },
        {
            name: "salePrice",
            label: "Price",
            id: "salePrice",
            placeholder: prevData.salePrice,
            validationFn: validatePrice,
            type: "number"
        }
    ];
    
    return (
        <Modal toggleModal={toggleModal}>
            <CustomForm onSubmit={editHandler} inputs={inputs} button="Save changes" />
        </Modal>
    );
};

export default EditItemForm;