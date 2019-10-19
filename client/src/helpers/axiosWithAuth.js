import axios from 'axios';

export default function axiosWithAuth() {
    const instance = axios.create({
        baseURL: 'http://localhost:5000/',
        headers: { authorization: localStorage.getItem('token') }
    });
    return instance;
}
