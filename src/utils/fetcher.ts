import axios from 'axios';
import { authorizationToken } from './getToken';

export const BASE_URL = `https://squash.itomic.app/api/v1`

const fetcher = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

fetcher.interceptors.request.use((config) => {
    const token = authorizationToken(); 
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const fetcherGet = fetcher.get;
export const fetcherPost = fetcher.post;
export const fetcherDelete = fetcher.delete;
export const fetcherPut = fetcher.put;

export default fetcher;
