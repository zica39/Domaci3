import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getBooks = ({ queryKey }) => {
    const [_key, { page, filter,size }] = queryKey;
    void _key;
    const params = {};
    params.page = filter?0:page;
    params.size = size;
    if(filter)params["isbn.contains"] = filter;

    return axiosInstance.get('/books',{
        params:params,
        headers:{'Authorization': getToken()}
    });
}

export const getBook = (id) => {

    return axiosInstance.get('/books/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const deleteBook = (id) => {

    return axiosInstance.delete('/books/'+id,{
        headers:{'Authorization': getToken()}
    });
}

export const createBook = (data) => {

    return axiosInstance.post('/books',data,{
        headers:{'Authorization': getToken()},
    });
}

export const updateBook = (data) => {

    return axiosInstance.put('/books',data,{
        headers:{'Authorization': getToken()},
    });
}
