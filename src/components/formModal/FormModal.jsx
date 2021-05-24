import{Modal,Button} from "react-bootstrap";
import {PlusCircle, Save, Trash, Pencil} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formatDate, generateForm, generateFormData, swalAlert} from "../../functions/tools";
import book_model from "../../constants/book_model";
import {useMutation, useQueryClient} from "react-query";
import {createBook, getBook, updateBook} from "../../services/books";

const FormModal = ({openModal,setOpenModal}) => {
    const [show, setShow] = useState(true);
    const [isDisabled,setIsDisabled] = useState(false);

    const handleClose = () => {
        if(isDisabled === true) return false;

        setOpenModal({});
        setShow(false);
    }

    const[isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();


    const schema = yup.object().shape({
        publisherName: yup.string().required(),
        isbn: yup.string().required(),
        writerName: yup.string().required(),
        publishedDate: yup.date().required(),
        genre:yup.string().required()
    });

    const {register,formState: { errors }, handleSubmit,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:generateFormData(book_model)
    });

    //console.log(errors);
    const createMutation = useMutation(createBook, {
        onSuccess: () => {
            //history.push('/books');
            setIsDisabled(false);
            setOpenModal({});
            swalAlert('success','Good job!','Book created successfully!').then(()=>queryClient.invalidateQueries('books'));
        },
        onError: () => {
            swalAlert('error','Oops...',createMutation.error);
            setIsDisabled(false);
        }
    });

    const updateMutation = useMutation(updateBook, {
        onSuccess: () => {
            setIsDisabled(false);
            setOpenModal({});
            swalAlert('success','Good job!','Book updated successfully!').then(()=>queryClient.invalidateQueries('books'));
        },
        onError: () =>{
            swalAlert('error','Oops...', updateMutation.error);
            setIsDisabled(false);
        }
    });

    useEffect(()=>{
        if(openModal?.id) {
            setIsLoading(true);
            getBook(openModal?.id).then(response => {
                //setFormData(response.data);
                reset(response.data);

                setIsLoading(false);
            }).catch(error => {
                alert(error?.message);
            })
        }
    },[openModal?.id]);

    const onSave = (e) => {

        e.publishedDate = formatDate(e.publishedDate);
        setIsDisabled(true);

        if(openModal.id){
            updateMutation.mutate(e);
        }else{
            createMutation.mutate(e);
        }

    }


    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <form>
                <Modal.Header closeButton>
                    <Modal.Title>{openModal.id?<Pencil/>:<PlusCircle/>}{openModal.id?' Edit':' Create'} Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <div className="container-fluid">
                                {isLoading?
                                    <div className='d-flex justify-content-center'><div className="spinner-border text-primary"/></div>:
                                        generateForm(book_model,register,errors)
                                   }
                            </div>
                </Modal.Body>
                <Modal.Footer>

                    {isDisabled ? <div className={`spinner-border ${openModal.id ? 'text-primary' : 'text-success'} `} /> :
                        <>
                        <Button variant="secondary" onClick={handleClose}> Cancel</Button>
                        <button type="submit" className={`btn ${openModal.id ? 'btn-primary' : 'btn-success'} rounded`}
                                onClick={handleSubmit(onSave)}>{openModal.id ? <Save/> :
                            <PlusCircle/>} {openModal.id ? 'Save' : 'Create'}</button>
                    </>
                    }
                </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default FormModal;