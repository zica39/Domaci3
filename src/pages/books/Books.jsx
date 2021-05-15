import React, {useState, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {useHistory} from 'react-router-dom';
import {getBooks, deleteBook, getBooksCount} from "../../services/books";

const Books = () => {

    const[filter,setFilter] = useState('');
    const[books,setBooks] = useState([]);
    const[page,setPage] = useState(0);
    const[booksCount,setBooksCount] = useState(0);
    const[loading,setLoading] = useState(false);

    const[deleteId,setDeleteId] = useState(0);

    const history = useHistory();

    const  label = 'book';


    const onEditRow = (row) => {
        history.push('/books/edit/'+row.id);
    }

    const onNewRow = ()=>{
        history.push('/books/create');
    }
    const onRowDelete = (row)=>{
        setDeleteId(row.id);
    }

    const removeRow = (id) => {
        setLoading(true);
        deleteBook(id).then(() => {
            history.push('/books');
        }).catch(error => {
            setDeleteId(0);
            alert(error?.message);
        })
    }

    useEffect(()=>{
        setLoading(true);
        getBooks(page,filter).then(function(response){
            setBooks(response.data);
            getBooksCount(filter).then(res=>{
                setBooksCount(res.data);
                setLoading(false);
            }).catch(error=>{
                alert(error?.message);
                setLoading(false);
            });


        }).catch(function (error) {
            alert(error?.message);
            setLoading(false);
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
                          loading={loading}
                    />
                }
            </div>
            {deleteId?<DeleteModal id={deleteId} setDeleteId={setDeleteId} removeRow={removeRow} />:''}
        </div>

}

export default Books;

