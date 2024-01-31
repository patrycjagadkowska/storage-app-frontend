import Modal from "../UI/Modal";
import CustomForm from "../UI/CustomForm";

const AddCategoryForm = ({ toggleModal, addCategoryHandler }) => {
    const inputs = [
        {
            label: "Category name",
            id: "name",
            name: "name",
            type: "text",
            validationFn: () => {return false;},
            initialValue: ""
        }
    ];

    return (
        <Modal toggleModal={toggleModal}>
            <h3>Add new category</h3>
            <CustomForm inputs={inputs} onSubmit={addCategoryHandler} button="Add" />
        </Modal>
    );
};

export default AddCategoryForm;