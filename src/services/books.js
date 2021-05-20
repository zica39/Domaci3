import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getBooks = (page,filter) => {

    return axiosInstance.get('/books',{
        params:{
            page:filter?0:page,
            "isbn.contains":filter
        },
        headers:{'Authorization': getToken()}
    });
}

export const getBooksCount = (filter) => {

    return axiosInstance.get('/books/count',{
        params:{
            "isbn.contains":filter
        },
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
