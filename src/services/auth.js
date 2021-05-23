import axiosInstance from "../services/axios";
import {getToken} from "../functions/tools";

export const login = (data) => {
    return axiosInstance.post('/authenticate',data);
}

export const registerUser = (data) => {
    return axiosInstance.post('/register',data);
}

export const getUser = (username) => {
    return axiosInstance.get('/users/'+username,{
        headers:{'Authorization': getToken()},
    });
}
