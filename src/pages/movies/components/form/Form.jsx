import React, {useEffect, useState} from 'react';
import {PlusCircle, Save, X} from 'react-bootstrap-icons';
import {useHistory,useParams} from 'react-router-dom';
import {generateFormData} from "../../../../functions/tools";
import {createMovie,getMovie,updateMovie} from "../../../../services/movies";
import movie_model from "../../../../constants/movies";

const Form = () => {

    const [formData, setFormData] = useState(generateFormData(movie_model));
    const [disabled,setDisabled] = useState(false);
    const[loading, setLoading] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        if(id) {
            setLoading(true);
            getMovie(id).then(response => {
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
            updateMovie(formData).then(response =>{
                history.push('/movies');
            }).catch(error =>{
                alert(error?.message);
                setDisabled(false);
            });

        }else{
            createMovie(formData).then(response =>{
                history.push('/movies');
            }).catch(error =>{
                alert(error?.message);
                setDisabled(false);
            });
        }

    }

    const onExit = () =>{
        history.push('/movies');
    }

    return <div className='container border-white shadow-lg bg-light mt-3'>
        <button onClick={()=>onExit()} className="btn btn-sm mt-1 btn-outline-danger float-right"><X/></button>
        <div className='row my-3'>
            <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                {loading?
                    <div className="spinner-border text-primary"/>:
                    <form>
                        <h4 className='mb-3'> {id?'Edit':'Create'} Movie</h4>

                        <div className="form-group" >
                            <label htmlFor="directorName">directorName</label>
                            <input type="text" className="form-control shadow-sm" id="directorName" aria-describedby="directorName"
                                   placeholder="directorName"
                                   value={formData.directorName}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'directorName':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="duration">duration</label>
                            <input type="number" className="form-control shadow-sm" id="duration" aria-describedby="duration"
                                   placeholder="duration"
                                   value={formData.duration}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'duration':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="name">name</label>
                            <input type="text" className="form-control shadow-sm" id="name" aria-describedby="name"
                                   placeholder="name"
                                   value={formData.name}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'name':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="rating">rating</label>
                            <input type="number" className="form-control shadow-sm" id="rating" aria-describedby="rating"
                                   placeholder="rating"
                                   value={formData.rating}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'rating':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="writerName">writerName</label>
                            <input type="text" className="form-control shadow-sm" id="writerName" aria-describedby="writerName"
                                   placeholder="writerName"
                                   value={formData.writerName}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'writerName':e.target.value}
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
