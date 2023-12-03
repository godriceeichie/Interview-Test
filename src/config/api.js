import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://interview-test-backend-i1wv.onrender.com/api',

})

export default instance