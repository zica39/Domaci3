import React, {useState, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import {useHistory} from 'react-router-dom';
import {getBooks, deleteBook, getBooksCount} from "../../services/books";

const Books = () => {

    const[filter,setFilter] = useState('');
    const[books,setBooks] = useState([]);
    const[page,setPage] = useState(0);
    const[booksCount,setBooksCount] = useState(0);

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
                console.log(response);
                history.push('/books');
            }).catch(error => {
                alert(error?.message);
            })
        }
    }

    useEffect(()=>{
        getBooks(page,filter).then(function(response){
            setBooks(response.data);
            getBooksCount(filter).then(res=>{
                setBooksCount(res.data);
            }).catch(error=>{
                alert(error?.message)
            });


        }).catch(function (error) {
            alert(error?.message);
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

                          itemsCount={booksCount}
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

