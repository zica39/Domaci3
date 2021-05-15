import React, {useState, useReducer, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import books from "../../constants/books";
import AppData from "../../contexts/AppData";
import {useHistory} from 'react-router-dom';
import {loadFromStorage, saveToStorage} from "../../functions/tools";
import {changeData} from "../../functions/changeData";
import {getBooks, login, deleteBook, getBooksCount} from "../../services/books";

const Books = () => {

    const[filter,setFilter] = useState('');
    const [books,setBooks] = useState([]);
    const[page,setPage] = useState(0);
    const[bookCount,setBookCount] = useState(0);

    const history = useHistory();

    const  label = 'book';


    const onEditRow = (row) => {
        history.push('/books/edit/'+row.id);
    }

    const onNewRow = ()=>{
        history.push('/books/create');
    }
    const onRowDelete = (row)=>{
        if(window.confirm('Are you sure?')){
            deleteBook(row.id).then(response => {
                history.push('/books');
            }).catch(error => {
                alert(error?.response?.data?.detail);
            })
        }
    }

    useEffect(()=>{
        getBooks(page,filter).then(function(response){
            setBooks(response.data);
            getBooksCount(filter).then(res=>{
                setBookCount(res.data);
            }).catch(err=>alert(err?.data?.title));


        }).catch(function (error) {
            alert(error?.response?.data?.detail);
        });
    },[page,filter]);



    return<div className="container-fluid">
            <div>
                {
                    <Grid onEditRow={onEditRow}
                          onNewRow={onNewRow}
                          onRowDelete={onRowDelete}
                          data={books}
                          label={label}

                          bookCount={bookCount}
                          setPage={setPage}
                          page={page}

                          filter={filter}
                          setFilter={setFilter}
                    />
                }
            </div>
        </div>

}

export default Books;

