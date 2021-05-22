import React, {useState, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {useHistory} from 'react-router-dom';
import {getBooks, deleteBook} from "../../services/books";
import {useMutation, useQuery, useQueryClient} from "react-query";
import useDebounce from '../../customHooks/useDebounce';
import Swal from "sweetalert2";

const Books = () => {

    const[filter,setFilter] = useState('');
    const debouncedValue = useDebounce(filter, 200);

    const[page,setPage] = useState(0);
    const[deleteId,setDeleteId] = useState(0);

    const history = useHistory();

    const  label = 'book';

    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['books',{page:page,filter:debouncedValue}],  getBooks);


    const deleteMutation = useMutation(deleteBook, {
        onSuccess: () => {
            history.push('/books');
            queryClient.invalidateQueries('books');
        }
    })


    const onEditRow = (row) => {
        history.push('/books/edit/'+row.id);
    }

    const onNewRow = ()=>{
        history.push('/books/create');
    }

    const removeRow = (id) => {

        deleteMutation.mutate(id);

        Swal.fire(
            'Good job!',
            'Item deleted successfully!',
            'success'
        );

        if(deleteMutation.isError){
            setDeleteId(0);
            alert(deleteMutation.error);
        }
    }


    if(isError){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    }



    return<div className="container-fluid">
            <div>
                {
                    <Grid onEditRow={onEditRow}
                          onNewRow={onNewRow}
                          onRowDelete={setDeleteId}
                          data={data?data.data:[]}
                          label={label}

                          itemsCount={parseInt(data?.headers['x-total-count'])}
                          setPage={setPage}
                          page={page}

                          filter={filter}
                          setFilter={setFilter}
                          loading={isLoading}
                    />
                }
            </div>
            {deleteId?<DeleteModal id={deleteId} setDeleteId={setDeleteId} removeRow={removeRow} />:''}
        </div>

}

export default Books;

