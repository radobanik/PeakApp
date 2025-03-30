import axios from 'axios';

const SERVER_URI = process.env.SERVER_URI || 'localhost:8080';
const api = axios.create({
    baseURL: SERVER_URI
})
