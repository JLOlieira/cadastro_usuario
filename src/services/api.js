import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-cadastro-usuario-7ks9.onrender.com'
})

export default api;