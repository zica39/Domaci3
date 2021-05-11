import React, {useState} from 'react';
import {PlusCircle, Save, X} from 'react-bootstrap-icons';
import {useHistory} from 'react-router-dom';
import {destroyData, loadFromStorage, saveToStorage} from "../../../../functions/tools";


const Form = () => {

    const data = loadFromStorage('people_data');

    const [name, setName] = useState(data?.name ? data?.name : '');
    const [age, setAge] = useState(data?.age ? data?.age : '');
    const [city, setCity] = useState(data?.city ? data?.city : '');

    const history = useHistory();

    const onSave = () => {

        if(!name){
            alert('Name field is required!');
            return false;
        }

        if(data?.id){
            saveToStorage('people_data',{type: 'edit', data: {id: data?.id, name: name, age: age,city:city}})
        }else{
            saveToStorage('people_data',{type: 'add', data: {name: name, age: age,city:city}})
        }
        history.push('/people')
    }

    const onExit = () =>{
        destroyData('people_data')
        history.push('/people');
    }
    return <div className='container border-white shadow-lg bg-light mt-3'>
        <button onClick={()=>onExit()} className="btn btn-sm mt-1 btn-outline-danger float-right"><X/></button>
        <div className='row my-3'>
            <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                <form>
                    <h4 className='mb-3'> {data?.id?'Edit':'Create'} Person</h4>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Full Name</label>
                        <input type="text" className="form-control shadow-sm" id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInput1">City</label>
                        <input type="text" className="form-control shadow-sm" id="exampleInput1" placeholder="City"
                               value={city}
                               onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Age</label>
                        <input type="number" className="form-control shadow-sm" id="exampleInputPassword1" placeholder="Age"
                               value={age}
                               onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <button type="button" className={`btn ${data?.id?'btn-primary':'btn-success'} rounded`} onClick={() => onSave()}>{data?.id?<Save/>:<PlusCircle/>} {data?.id?'Save':'Create'}</button>
                </form>

            </div>
        </div>
    </div>;

}

export default Form;
