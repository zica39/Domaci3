import {Modal,Button} from "react-bootstrap";
import {PlusCircle, Pencil} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formatDate, generateForm, generateFormData, swalAlert} from "../../functions/tools";
import {useMutation, useQueryClient} from "react-query";

const FormModal = ({openModal,setOpenModal,model,schema,getItem,createItem,updateItem}) => {
    const [show, setShow] = useState(true);
    const [isDisabled,setIsDisabled] = useState(false);

    const handleClose = () => {
        if(isDisabled === true) return false;

        setOpenModal({});
        setShow(false);
    }

    const[isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const {register,formState: { errors }, handleSubmit,reset} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:generateFormData(model)
    });

    const createMutation = useMutation(createItem, {
        onSuccess: () => {
            setIsDisabled(false);
            setOpenModal({});
            swalAlert('success','Good job!',openModal.title+' created successfully!').then(()=>queryClient.invalidateQueries(openModal.key));
        },
        onError: () => {
            swalAlert('error','Oops...',createMutation.error);
            setIsDisabled(false);
        }
    });

    const updateMutation = useMutation(updateItem, {
        onSuccess: () => {
            setIsDisabled(false);
            setOpenModal({});
            swalAlert('success','Good job!',openModal.title+' updated successfully!').then(()=>queryClient.invalidateQueries(openModal.key));
        },
        onError: () =>{
            swalAlert('error','Oops...', updateMutation.error);
            setIsDisabled(false);
        }
    });

    useEffect(()=>{
        if(openModal?.id) {
            setIsLoading(true);
            getItem(openModal?.id).then(response => {
                reset(response.data);
                setIsLoading(false);
            }).catch(error => {
                swalAlert('error','Oops...', error?.message);
            })
        }
    },[openModal?.id,getItem,reset]);

    const onSave = (e) => {

        if(e.publishedDate)
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
                    <Modal.Title>{openModal.id?<Pencil/>:<PlusCircle/>} {openModal.action} {openModal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                            <div className="container-fluid">
                                {isLoading?
                                    <div className='d-flex justify-content-center'><div className="spinner-border text-primary"/></div>:
                                        generateForm(model,register,errors)
                                   }
                            </div>
                </Modal.Body>
                <Modal.Footer>

                    {isDisabled ? <div className={`spinner-border ${openModal.id ? 'text-primary' : 'text-success'} `} /> :
                        <>
                        <Button variant="secondary" onClick={handleClose}> Cancel</Button>
                        <button type="submit" className={`btn ${openModal.id ? 'btn-primary' : 'btn-success'} rounded`}
                                onClick={handleSubmit(onSave)}>{openModal.id ? <Pencil/> :
                            <PlusCircle/>} {openModal.action}</button>
                    </>
                    }
                </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default FormModal;