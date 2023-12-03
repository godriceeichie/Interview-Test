import axios from 'axios'

const instance = axios.create({
    // baseURL: 'https://interview-test-backend-i1wv.onrender.com/api'
    baseURL: 'http://localhost:8000/api',

})

export default instance