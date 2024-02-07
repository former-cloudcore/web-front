import axios from 'axios';
import { SERVER_URL } from './consts';

const apiClient = axios.create({
    baseURL: SERVER_URL,
});

export default apiClient;
