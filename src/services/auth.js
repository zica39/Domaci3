import axios from "axios";

export const login = (data) =>{

    return axios({
        baseURL: 'http://localhost:8080/api/',
        method: 'post',
        url: '/authenticate',
        data: data
    })

}