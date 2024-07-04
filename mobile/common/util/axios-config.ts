import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useAuth } from '../service/AuthContext';
import * as SecureStore from 'expo-secure-store';

const authState = useAuth();

export const axiosPrivate = axios.create({
    baseURL: 'http://starsummit.net:8888/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== '/auth/refresh-token'
        ) {
            console.log(`Refreshing token...`);
            originalRequest._retry = true;
            return axiosPrivate
                .post('/auth/refresh-token', {
                    refresh_token: SecureStore.getItemAsync('refresh_token'),
                })
                .then(async (response) => {
                    await SecureStore.setItemAsync(
                        'access_token',
                        response.data.access_token
                    );
                    axiosPrivate.defaults.headers.common['Authorization'] =
                        `Bearer ${response.data.access_token}`;
                    return axiosPrivate(originalRequest);
                });
        }
        return Promise.reject(error);
    }
); */

export const useAxiosPrivate = makeUseAxios({
    axios: axiosPrivate,
});
