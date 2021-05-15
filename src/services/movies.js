import axios from "axios";
import {loadFromStorage} from "../functions/tools";

export const getMovies = (page,filter) => {

    let query =  filter?'name.contains='+filter:'';
    page = query?0:page;

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'get',
        url: '/movies?page='+page +'&'+ query,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
    })
}

export const getMoviesCount = (filter) => {
    let query =  filter?'?name.contains='+filter:'';

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'get',
        url: '/movies/count'+ query,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
    })
}
export const getMovie = (id) => {
    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'get',
        url: '/movies/'+id,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},

    })
}

export const deleteMovie = (id) => {
    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'delete',
        url: '/movies/'+id,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},

    })
}

export const createMovie = (data) =>{

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'post',
        url: '/movies',
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
        data:data
    })
}

export const updateMovie = (data) =>{

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'put',
        url: '/movies',
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
        data:data
    })
}