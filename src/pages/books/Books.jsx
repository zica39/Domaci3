import React, {useState, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {getBook,updateBook,createBook,getBooks, deleteBook} from "../../services/books";
import {useMutation, useQuery, useQueryClient} from "react-query";
import useDebounce from '../../customHooks/useDebounce';
import {swalAlert} from "../../functions/tools";
import FormModal from "../../components/formModal/FormModal";
import {book_model,book_schema} from "../../constants/book_model";

const Books = () => {

    const[filter,setFilter] = useState('');
    const debouncedValue = useDebounce(filter, 200);

    const[page,setPage] = useState(0);
    const[deleteId,setDeleteId] = useState(0);
    const[openModal,setOpenModal] = useState({});

    const  label = 'book';

    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['books',{page:page,filter:debouncedValue}],  getBooks);


    const deleteMutation = useMutation(deleteBook, {
        onSuccess: () => {
            queryClient.invalidateQueries('books');

            swalAlert('success','Good job!','Book deleted successfully!');
            setDeleteId(0);
        }
    })

    const onEditRow = (row) => {
        setOpenModal({open:true,action: 'Edit',id: row.id,title: 'Book'});
    }

    const onNewRow = ()=>{
        setOpenModal({open:true,action: 'Create', title:'Book'});

    }

    const removeRow = (id) => {

        deleteMutation.mutate(id);

        if(deleteMutation.isError){
            swalAlert('error','Oops...',deleteMutation.error);
            setDeleteId(0);
        }


    }

    if(isError){
        swalAlert('error','Oops...',error);
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
            {deleteId?<DeleteModal id={deleteId} setDeleteId={setDeleteId} removeRow={removeRow} title='book' />:''}
            {openModal.open?<FormModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                model={book_model}
                schema={book_schema}
                createItem={createBook}
                updateItem={updateBook}
                getItem={getBook}
            />:''}

        </div>

}

export default Books;

