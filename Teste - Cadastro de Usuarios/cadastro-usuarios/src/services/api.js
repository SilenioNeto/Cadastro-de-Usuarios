import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.10.14:3000'
})

export default api