import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getPeople = ({ queryKey }) => {
    const [_key, { page, filter, size }] = queryKey;
    void _key;
    const params = {};
    params.page = filter?0:page;
    params.size = size;
    if(filter)params["firstName.contains"] = filter;

    return axiosInstance.get('/people',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}

export const getPerson = (id) => {

    return axiosInstance.get('/people/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const deletePerson = (id) => {

    return axiosInstance.delete('/people/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const createPerson = (data) => {

    return axiosInstance.post('/people',data,{
        headers:{'Authorization': getToken()},
    });
}

export const updatePerson = (data) => {

    return axiosInstance.put('/people',data,{
        headers:{'Authorization': getToken()},
    });
}