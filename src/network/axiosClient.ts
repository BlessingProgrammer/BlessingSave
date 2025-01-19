import axios from 'axios'
import {apiUrl} from "../utils/apiUrl";

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    validateStatus: function (status) {
        return status >= 200 && status < 600;
    }
});

export default axiosClient;
