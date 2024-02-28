import Modal from "../UI/Modal";
import CustomButton from "../UI/CustomButton";

const DeleteForm = ({ deleteHandler, toggleModal, deleteItemName }) => {
    return (
        <Modal toggleModal={toggleModal}>
            <h3>Are you sure you want to delete this {deleteItemName}?</h3>
            <div>
                <CustomButton onClick={deleteHandler}>Delete</CustomButton>
                <CustomButton onClick={toggleModal}>Go back</CustomButton>
            </div>
        </Modal>
    );
};

export default DeleteForm;