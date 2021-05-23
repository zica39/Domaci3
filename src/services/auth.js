import axiosInstance from "../services/axios";

export const login = (data) => {
    return axiosInstance.post('/authenticate',data);
}

export const registerUser = (data) => {
    return axiosInstance.post('/register',data);
}

export const getUser = (username) => {
    return axiosInstance.post('/register/'+username);
}
