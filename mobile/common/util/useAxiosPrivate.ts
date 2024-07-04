import { useContext } from 'react';
import { AuthContext } from '../service/AuthContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import useAxios, { configure, makeUseAxios } from 'axios-hooks';

const ACCESS_KEY = 'jwt_access_token';
const baseURL = 'http://starsummit.net:8888/';

export default function useAxiosPrivate() {
    const { authState, onRefreshToken } = useContext(AuthContext);

    const axiosPrivate = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authState?.access_token}`,
        },
    });

    axiosPrivate.interceptors.request.use(async (req) => {
        // console.log(`Request headers: ${req.headers.Authorization}`);
        const decodedToken = jwtDecode(SecureStore.getItem(ACCESS_KEY)!);
        // console.log(`diff: ${dayjs.unix(decodedToken.exp!).diff()}`);
        const isExpired = dayjs.unix(decodedToken.exp!).diff(dayjs(), 's') < 10;

        if (!isExpired) return req;

        const result = await onRefreshToken!();

        req.headers!.Authorization = `Bearer ${result.data.access_token}`;

        return req;
    });

    return axiosPrivate;
}
