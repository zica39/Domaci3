import React, {useEffect, useState} from 'react';
import {PlusCircle, Save, X} from 'react-bootstrap-icons';
import {useHistory,useParams} from 'react-router-dom';
import {generateFormData} from "../../../../functions/tools";
import {createPerson,getPerson, updatePerson} from "../../../../services/people";
import person_model from "../../../../constants/person_model";

const Form = () => {

    const [formData, setFormData] = useState(generateFormData(person_model));
    const [disabled,setDisabled] = useState(false);
    const[loading, setLoading] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        if(id) {
            setLoading(true);
            getPerson(id).then(response => {
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
            updatePerson(formData).then(response =>{
                history.push('/people');
            }).catch(error =>{
                alert(error?.message);
                setDisabled(false);
            });

        }else{
            createPerson(formData).then(response =>{
                history.push('/people');
            }).catch(error =>{
                alert(error?.message);
                setDisabled(false);
            });
        }

    }

    const onExit = () =>{
        history.push('/people');
    }

    return <div className='container border-white shadow-lg bg-light mt-3'>
        <button onClick={()=>onExit()} className="btn btn-sm mt-1 btn-outline-danger float-right"><X/></button>
        <div className='row my-3'>
            <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                {loading?
                    <div className="spinner-border text-primary"/>:
                    <form>
                        <h4 className='mb-3'> {id?'Edit':'Create'} Person</h4>
                        <div className="form-group" >
                            <label htmlFor="firstName">firstName</label>
                            <input type="text" className="form-control shadow-sm" id="firstName" aria-describedby="firstName"
                                   placeholder="Enter firstName"
                                   value={formData.firstName}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'firstName':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="lastName">lastName</label>
                            <input type="text" className="form-control shadow-sm" id="lastName" aria-describedby="lastName"
                                   placeholder="Enter lastName"
                                   value={formData.lastName}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'lastName':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="age">age</label>
                            <input type="number" className="form-control shadow-sm" id="age" aria-describedby="age"
                                   placeholder="Enter age"
                                   value={formData.age}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'age':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="dateOfBirth">age</label>
                            <input type="date" className="form-control shadow-sm" id="dateOfBirth" aria-describedby="dateOfBirth"
                                   placeholder="Enter dateOfBirth"
                                   value={formData.dateOfBirth}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'dateOfBirth':e.target.value}
                                   })}
                            />
                        </div>

                        <div className="form-group" >
                            <label htmlFor="dateOfBirth">gender</label>
                            <select className="form-control shadow-sm" id="gender" aria-describedby="gender"
                                   placeholder="Enter gender"
                                   value={formData.gender}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'gender':e.target.value}
                                   })}
                            >
                                <option>-select gander-</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            </select>
                        </div>

                        <div className="form-group" >
                            <label htmlFor="occupation">occupation</label>
                            <input type="text" className="form-control shadow-sm" id="occupation" aria-describedby="occupation"
                                   placeholder="Enter occupation"
                                   value={formData.occupation}
                                   onChange={(e) => setFormData(prevState => {
                                       return{...prevState,'occupation':e.target.value}
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
