import React, {useState, useEffect} from 'react';
import Grid from "../../components/grid/Grid";
import {useHistory} from 'react-router-dom';
import {getMovies,deleteMovie,getMoviesCount} from "../../services/movies";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const Movies = () => {

    const[filter,setFilter] = useState('');
    const[movies,setMovies] = useState([]);
    const[page,setPage] = useState(0);
    const[moviesCount,setMoviesCount] = useState(0);
    const[loading,setLoading] = useState(false);

    const[deleteId,setDeleteId] = useState(0);

    const history = useHistory();

    const  label = 'movie';


    const onEditRow = (row) => {
        history.push('/movies/edit/'+row.id);
    }

    const onNewRow = ()=>{
        history.push('/movies/create');
    }
    const onRowDelete = (row)=>{
        setDeleteId(row.id);
    }

    const removeRow = (id) => {
        setLoading(true);
        deleteMovie(id).then(() => {
            history.push('/movies');
        }).catch(error => {
            setDeleteId(0);
            alert(error?.message);
        })
    }

    useEffect(()=>{
        setLoading(true);
        getMovies(page,filter).then(function(response){
            setMovies(response.data);
            getMoviesCount(filter).then(res=>{
                setMoviesCount(res.data);
                setLoading(false);
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
                      data={movies}
                      label={label}

                      itemsCount={moviesCount}
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

export default Movies;

