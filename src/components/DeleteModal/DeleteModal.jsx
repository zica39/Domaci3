import{Modal,Button} from "react-bootstrap";
import {Trash} from "react-bootstrap-icons";
import {useState} from "react";

const DeleteModal = ({id,removeRow,setDeleteId}) => {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        setDeleteId(0);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title><Trash/> Remove item</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={(e)=>{
                        removeRow(id);
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteModal;