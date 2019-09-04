import Axios from "axios";

export const api = Axios.create({
        baseURL: 'http://5.23.54.233:8080',
        headers: 'Access-Control-Allow-Origin'
    })

