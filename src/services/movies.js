import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getMovies = ({ queryKey }) => {
    const [_key, { page, filter }] = queryKey;
    void _key;
    const params = {};
    params.page = filter?0:page;
    if(filter)params["name.contains"] = filter;

    return axiosInstance.get('/movies',{
        params:params,
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

export const updateMovie = (data) => {

    return axiosInstance.put('/movies',data,{
        headers:{'Authorization': getToken()},
    });
}