import Modal from "../UI/Modal";
import CustomButton from "../UI/CustomButton";

const DeleteSupplyForm = ({ deleteSupply, toggleModal }) => {
    return (
        <Modal toggleModal={toggleModal}>
            <h3>Are you sure you want to delete this supply?</h3>
            <div>
                <CustomButton onClick={deleteSupply}>Delete</CustomButton>
                <CustomButton onClick={toggleModal}>Go back</CustomButton>
            </div>
        </Modal>
    );
};

export default DeleteSupplyForm;