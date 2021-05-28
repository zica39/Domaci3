import React, {useState} from 'react';
import Grid from "../../components/grid/Grid";
import {getMovie,updateMovie,createMovie,getMovies, deleteMovie} from "../../services/movies";
import {useMutation, useQuery, useQueryClient} from "react-query";
import useDebounce from '../../customHooks/useDebounce';
import {swalAlert} from "../../functions/tools";
import FormModal from "../../components/formModal/FormModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import {movie_model,movie_schema} from "../../constants/movie_model";

const Books = () => {

    const[filter,setFilter] = useState('');
    const debouncedValue = useDebounce(filter, 200);

    const[page,setPage] = useState(0);
    const[pageSize,setPageSize] = useState(10);
    const[deleteId,setDeleteId] = useState(0);
    const[openModal,setOpenModal] = useState({});

    const  label = 'movie';

    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery(['movies',{page:page,filter:debouncedValue,size:pageSize}],  getMovies);


    const deleteMutation = useMutation(deleteMovie, {
        onSuccess: () => {
            queryClient.invalidateQueries('movies');

            swalAlert('success','Good job!','Movie deleted successfully!');
            setDeleteId(0);
        }
    })

    const onEditRow = (row) => {
        setOpenModal({open:true,action: 'Edit',id: row.id,title: 'Movie',key:'movies'});
    }

    const onNewRow = ()=>{
        setOpenModal({open:true,action: 'Create', title:'Movie', key:'movies'});

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
                      pageSize={pageSize}
                      setPageSize={setPageSize}

                      filter={filter}
                      setFilter={setFilter}
                      loading={isLoading}
                />
            }
        </div>
        {deleteId?<DeleteModal id={deleteId} setDeleteId={setDeleteId} removeRow={removeRow} title='movie' />:''}
        {openModal.open?<FormModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            model={movie_model}
            schema={movie_schema}
            createItem={createMovie}
            updateItem={updateMovie}
            getItem={getMovie}
        />:''}

    </div>

}

export default Books;

