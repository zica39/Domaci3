import{Modal,Button} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons";
import {useState} from "react";

const DeleteModal = ({id,removeRow,setDeleteId,title}) => {
    const [show, setShow] = useState(true);
    const [isDisabled,setIsDisabled] = useState(false);

    const handleClose = () => {
        if(isDisabled) return false;

        setShow(false);
        setDeleteId(0);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title><Trash/> Remove {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this {title}? </Modal.Body>
                <Modal.Footer>
                    <Button disabled={isDisabled} variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button disabled={isDisabled} variant="danger" onClick={(e)=>{
                        removeRow(id);
                        setIsDisabled(true);
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;