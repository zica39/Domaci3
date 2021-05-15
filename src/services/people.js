import axios from "axios";
import {loadFromStorage} from "../functions/tools";

export const getPeople = (page,filter) => {

    let query =  filter?'firstName.contains='+filter:'';
    page = query?0:page;

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'get',
        url: '/people?page='+page +'&'+ query,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
    })
}

export const getPeopleCount = (filter) => {
    let query =  filter?'?firstName.contains='+filter:'';

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'get',
        url: '/people/count'+ query,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
    })
}
export const getPerson = (id) => {
    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'get',
        url: '/people/'+id,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},

    })
}

export const deletePerson = (id) => {
    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'delete',
        url: '/people/'+id,
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},

    })
}

export const createPerson = (data) =>{

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'post',
        url: '/people',
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
        data:data
    })
}

export const updatePerson = (data) =>{

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'put',
        url: '/people',
        headers: {'Authorization': 'Bearer '+loadFromStorage('id_token')},
        data:data
    })
}