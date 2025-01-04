import axios from 'axios';
import {AuthenticateService} from "@/services/AuthenticateService";


axios.defaults.baseURL = process.env.VUE_APP_API_URL;
let isRefreshing = false;
let hasTokenRefreshFailed = false;
axios.interceptors.request.use(request => {
    const token = AuthenticateService.getAuthToken();
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    if (response) {
        return response;
    }

    return response;
}, async error => {
    
    if (error.response && error.response.status === 403) {

        if (hasTokenRefreshFailed) {
            return Promise.reject(error);
        }

        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const refresh_token = AuthenticateService.updateTokens()

                const originalRequest = error.config;
                originalRequest.headers['Authorization'] = `Bearer ${refresh_token}`;

                isRefreshing = false;
                return axios(originalRequest);
            } catch (refreshError) {
                AuthenticateService.removeTokens()
                hasTokenRefreshFailed = true;
            } finally {
                isRefreshing = false;
            }
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => reject(error), 1000);
            });
        }
    }


    return Promise.reject(error);
});

export default axios;
