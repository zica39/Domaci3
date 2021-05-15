import axios from "axios";
import {BASE_URL} from "../constants/config";

export const login = (data) =>{

    return axios({
        baseURL: BASE_URL,
        method: 'post',
        url: '/authenticate',
        data: data
    })

}