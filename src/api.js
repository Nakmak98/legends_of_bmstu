import Axios from "axios";

export const api = Axios.create({
        baseURL: 'http://159.65.18.120:8080',
        headers: 'Access-Control-Allow-Origin'
    })

