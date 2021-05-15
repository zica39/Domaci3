import axios from "axios";
import {loadFromStorage} from "../functions/tools";
import{BASE_URL} from "../constants/config";

export const getBooks = (page,filter) => {

    let query =  filter?'isbn.contains='+filter:'';
    page = query?0:page;

    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: '/books?page='+page +'&'+ query,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
    })
}

export const getBooksCount = (filter) => {
    let query =  filter?'?isbn.contains='+filter:'';

    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: '/books/count'+ query,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
    })
}
export const getBook = (id) => {
    return axios({
        baseURL: BASE_URL,
        method: 'get',
        url: '/books/'+id,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},

    })
}

export const deleteBook = (id) => {
    return axios({
        baseURL: BASE_URL,
        method: 'delete',
        url: '/books/'+id,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},

    })
}

export const createBook = (data) =>{

    return axios({
        baseURL: BASE_URL,
        method: 'post',
        url: '/books',
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
        data:data
    })
}

export const updateBook = (data) =>{

    return axios({
        baseURL: BASE_URL,
        method: 'put',
        url: '/books',
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
        data:data
    })
}