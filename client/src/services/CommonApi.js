import axios from 'axios';
import { API_URL } from '../constants/Constants';

const instance = axios.create({
    baseURL: API_URL
});

export default instance;