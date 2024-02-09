import Modal from "../UI/Modal";
import CustomForm from "../UI/CustomForm";

const AddItemForm = ({ toggleModal, addItemHandler }) => {
    const inputs = [
        {
            label: "Item name",
            id: "name",
            name: "name",
            validationFn: () => {return false;},
            initialValue: "",
            type: "text"
        }
    ];

    return (
        <Modal toggleModal={toggleModal}>
            <h3>Add new item</h3>
            <CustomForm inputs={inputs} onSubmit={addItemHandler} button="Add" />
        </Modal>
    );
};

export default AddItemForm;