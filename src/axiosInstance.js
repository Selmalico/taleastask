import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev",
})

axiosInstance.interceptors.request.use (
    (config) => {
        const token = localStorage.getItem('idToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          config.headers["Content-Type"] = 'application/json'
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use (
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;