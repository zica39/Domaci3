import React, {useEffect, useState} from 'react';
import {PlusCircle, Save, X} from 'react-bootstrap-icons';
import {useHistory,useParams} from 'react-router-dom';
import {formatDate, generateForm, generateFormData} from "../../../../functions/tools";
import {createBook, deleteBook, getBook, updateBook} from "../../../../services/books";
import book_model from "../../../../constants/book_model";
import {useMutation} from "react-query";
import {swalAlert} from "../../../../functions/tools";
import {useForm} from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Form = () => {

    const [isDisabled,setIsDisabled] = useState(false);
    const[isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const { id } = useParams();

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
            history.push('/books');
            swalAlert('success','Good job!','Book created successfully!').then();
        },
        onError: () => {
            swalAlert('error','Oops...',createMutation.error);
            setIsDisabled(false);
        }
    });

    const updateMutation = useMutation(updateBook, {
        onSuccess: () => {
            history.push('/books');
            swalAlert('success','Good job!','Book updated successfully!').then();
        },
        onError: () =>{
            swalAlert('error','Oops...', updateMutation.error);
            setIsDisabled(false);
        }
    });

    useEffect(()=>{
        if(id) {
            setIsLoading(true);
            getBook(id).then(response => {
                //setFormData(response.data);
                reset(response.data);

                setIsLoading(false);
            }).catch(error => {
                alert(error?.message);
            })
        }
    },[id]);

    const onSave = (e) => {

        e.publishedDate = formatDate(e.publishedDate);
        setIsDisabled(true);

        if(id){
            updateMutation.mutate(e);
        }else{
            createMutation.mutate(e);
        }

    }

    const onExit = () =>{
        history.push('/books');
    }

    return <div className='container border-white shadow-lg bg-light mt-3'>
        <button onClick={()=>onExit()} className="btn btn-sm mt-1 btn-outline-danger float-right"><X/></button>
        <div className='row my-3'>
            <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                {isLoading?
                    <div className="spinner-border text-primary"/>:
                    <form>
                    <h4 className='mb-3'> {id?'Edit':'Create'} Book</h4>
                        {generateForm(book_model,register,errors)}

                    {isDisabled ? <div className="spinner-border"/> :
                        <button type="submit" className={`btn ${id ? 'btn-primary' : 'btn-success'} rounded`}
                              onClick={handleSubmit(onSave)}>{id ? <Save/> :
                            <PlusCircle/>} {id ? 'Save' : 'Create'}</button>
                    }
                </form>}
            </div>
        </div>
    </div>;
}

export default Form;
