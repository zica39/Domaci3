import React, {useState} from 'react';
import {PlusCircle, Save, X} from 'react-bootstrap-icons';
import {useHistory} from 'react-router-dom';
import {destroyData, loadFromStorage, saveToStorage} from "../../../../functions/tools";


const Form = () => {

    const data = loadFromStorage('books_data');

    const [title, setTitle] = useState(data?.title ? data?.title : '');
    const [year, setYear] = useState(data?.year ? data?.year : '');
    const [author, setAuthor] = useState(data?.author ? data?.author : '');

    const history = useHistory();

    const onSave = () => {

        if(!title){
            alert('Title field is required!');
            return false;
        }

        if(data?.id){
            saveToStorage('books_data',{type: 'edit', data: {id: data?.id, title: title, year: year,author:author}})
        }else{
            saveToStorage('books_data',{type: 'add', data: {title: title, year: year,author:author}})
        }
        history.push('/books')
    }

    const onExit = () =>{
        destroyData('books_data')
        history.push('/books');
    }

    return <div className='container border-white shadow-lg bg-light mt-3'>
        <button onClick={()=>onExit()} className="btn btn-sm mt-1 btn-outline-danger float-right"><X/></button>
        <div className='row my-3'>
            <div className="col-sm-10 offset-sm-1 col-md-6 offset-md-3">
                <form>
                    <h4 className='mb-3'> {data?.id?'Edit':'Create'} Book</h4>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Book title</label>
                        <input type="text" className="form-control shadow-sm" id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Title"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                        />

                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInput1">Author</label>
                        <input type="text" className="form-control shadow-sm" id="exampleInput1" placeholder="Author"
                               value={author}
                               onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Year</label>
                        <input type="number" className="form-control shadow-sm" id="exampleInputPassword1" placeholder="Year"
                               value={year}
                               onChange={(e) => setYear(e.target.value)}
                        />
                    </div>

                    <button type="button" className={`btn ${data?.id?'btn-primary':'btn-success'} rounded`} onClick={() => onSave()}>{data?.id?<Save/>:<PlusCircle/>} {data?.id?'Save':'Create'}</button>
                </form>

            </div>
        </div>
    </div>;
}

export default Form;
