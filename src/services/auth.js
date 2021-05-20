import axiosInstance from "../services/axios";

export const login = (data) => {
    return axiosInstance.post('/authenticate',data);
}