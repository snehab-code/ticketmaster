import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:3030',
    headers: {
        "x-auth": localStorage.getItem('authToken')
    }
})

axios.interceptors.request.use(config => {
    config.headers['x-auth'] = localStorage.getItem('authToken')
    return config
})

export default axios