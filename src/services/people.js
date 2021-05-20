import axiosInstance from "./axios";
import {getToken} from "../functions/tools";

export const getPeople = (page,filter) => {

    return axiosInstance.get('/people',{
        params:{
            page:filter?0:page,
            "firstName.contains":filter
        },
        headers:{'Authorization': getToken()}
    });
}

export const getPeopleCount = (filter) => {

    return axiosInstance.get('/people/count',{
        params:{
            "firstName.contains":filter
        },
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

export const updatePerson= (data) => {

    return axiosInstance.put('/people',data,{
        headers:{'Authorization': getToken()},
    });
}
