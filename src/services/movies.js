import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getMovies = (page,filter) => {

    return axiosInstance.get('/movies',{
        params:{
            page:filter?0:page,
            "name.contains":filter
        },
        headers:{'Authorization': getToken()}
    });
}

export const getMoviesCount = (filter) => {

    return axiosInstance.get('/movies/count',{
        params:{
            "name.contains":filter
        },
        headers:{'Authorization': getToken()}
    });
}

export const getMovie = (id) => {

    return axiosInstance.get('/movies/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const deleteMovie = (id) => {

    return axiosInstance.delete('/movies/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const createMovie = (data) => {

    return axiosInstance.post('/movies',data,{
        headers:{'Authorization': getToken()},
    });
}

export const updateMovie= (data) => {

    return axiosInstance.put('/movies',data,{
        headers:{'Authorization': getToken()},
    });
}
