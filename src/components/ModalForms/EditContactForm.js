import CustomForm from "../UI/CustomForm";
import Modal from "../UI/Modal";
import {
  validateAddress,
  validateOptionalEmail,
  validatePhone,
  validateContactName,
} from "../../constants/validationFns";

const EditContactForm = ({ prevData, toggleModal, editHandler }) => {
    const inputs = [
        {
            name: "name",
            type: "text",
            id: "name",
            label: "Name",
            validationFn: validateContactName,
            placeholder: prevData.name,
        },
        {
            name: "phone",
            type: "text",
            id: "phone",
            label: "Phone",
            validationFn: validatePhone,
            placeholder: prevData.phone,
        },
        {
            name: "address",
            type: "text",
            id: "address",
            label: "Address",
            validationFn: validateAddress,
            placeholder: prevData.address,
        },
        {
            name: "email",
            type: "email",
            id: "email",
            label: "Email",
            validateOptionalEmail,
            placeholder: prevData.email
        }
    ];


    return (
        <Modal toggleModal={toggleModal}>
            <CustomForm onSubmit={editHandler} button="Save changes" inputs={inputs} />
        </Modal>
    );
};

export default EditContactForm;