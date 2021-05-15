import React, {useEffect, useState} from 'react';
import {PlusCircle, Save, X} from 'react-bootstrap-icons';
import {useHistory,useParams} from 'react-router-dom';
import {generateFormData} from "../../../../functions/tools";
import {createBook, getBook, updateBook} from "../../../../services/books";
import book_model from "../../../../constants/book_model";

const Form = () => {

    const [formData, setFormData] = useState(generateFormData(book_model));
    const [disabled,setDisabled] = useState(false);
    const[loading, setLoading] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        if(id) {
            setLoading(true);
            getBook(id).then(response => {
                //console.log(response.data);
                setFormData(response.data);
                setLoading(false);
            }).catch(error => {
                alert(error?.message);
            })
        }
    },[id]);

    const onSave = () => {
        setDisabled(true);

        if(id){
            updateBook(formData).then(response =>{
                history.push('/books');
            }).catch(error =>{
                alert(error?.message);
                setDisabled(false);
            });

        }else{
           createBook(formData).then(response =>{
               history.push('/books');
           }).catch(error =>{
               alert(error?.message);
               setDisabled(false);
           });
        }

    }

    const onExit = () =>{
        history.push('/books');
    }

    return <div className='container border-white shadow-lg bg-light mt-3'>
        <button onClick={()=>onExit()} className="btn btn-sm mt-1 btn-outline-danger float-right"><X/></button>
        <div className='row my-3'>
            <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                {loading?
                    <div className="spinner-border text-primary"/>:
                    <form>
                    <h4 className='mb-3'> {id?'Edit':'Create'} Book</h4>
                    <div className="form-group" >
                        <label htmlFor="isbn">isbn</label>
                        <input type="text" className="form-control shadow-sm" id="isbn" aria-describedby="isbn"
                               placeholder="Enter isbn"
                               value={formData.isbn}
                               onChange={(e) => setFormData(prevState => {
                                   return{...prevState,'isbn':e.target.value}
                               })}
                        />

                    </div>

                    <div className="form-group" >
                        <label htmlFor="writerName">writerName</label>
                        <input type="text" className="form-control shadow-sm" id="writerName" aria-describedby="writerName"
                               placeholder="Enter writerName"
                               value={formData.writerName}
                               onChange={(e) => setFormData(prevState => {
                                   return{...prevState,'writerName':e.target.value}
                               })}
                        />
                    </div>

                    <div className="form-group" >
                        <label htmlFor="publisherName">publisherName</label>
                        <input type="text" className="form-control shadow-sm" id="publisherName" aria-describedby="publisherName"
                               placeholder="Enter publisherName"
                               value={formData.publisherName}
                               onChange={(e) => setFormData(prevState => {
                                   return{...prevState,'publisherName':e.target.value}
                               })}
                        />

                    </div>

                    <div className="form-group" >
                        <label htmlFor="publishedDate">publishedDate</label>
                        <input type="date" className="form-control shadow-sm" id="publishedDate" aria-describedby="publishedDate"
                               placeholder="Enter publishedDate"
                               value={formData.publishedDate}
                               onChange={(e) => setFormData(prevState => {
                                   return{...prevState,'publishedDate':e.target.value}
                               })}
                        />
                    </div>

                    <div className="form-group" >
                        <label htmlFor="genre">genre</label>
                        <input type="text" className="form-control shadow-sm" id="genre" aria-describedby="genre"
                               placeholder="Enter genre"
                               value={formData.genre}
                               onChange={(e) => setFormData(prevState => {
                                   return{...prevState,'genre':e.target.value}
                               })}
                        />
                    </div>

                    {disabled ? <div className="spinner-border"/> :
                        <button type="button" className={`btn ${id ? 'btn-primary' : 'btn-success'} rounded`}
                                onClick={() => onSave()}>{id ? <Save/> :
                            <PlusCircle/>} {id ? 'Save' : 'Create'}</button>
                    }
                </form>}
            </div>
        </div>
    </div>;
}

export default Form;
