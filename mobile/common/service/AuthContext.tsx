import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {
        access_token: string | null;
        refresh_token: string | null;
        authenticated: boolean | null;
    };
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onRefreshToken?: () => Promise<any>;
    onLogout?: () => Promise<any>;
}

const ACCESS_KEY = 'jwt_access_token';
const REFRESH_KEY = 'jwt_refresh_token';
export const API_URL = 'http://starsummit.net:8888';
export const AuthContext = createContext<AuthProps>({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    const [authState, setAuthState] = useState<{
        access_token: string | null;
        refresh_token: string | null;
        authenticated: boolean | null;
    }>({
        access_token: null,
        refresh_token: null,
        authenticated: null,
    });

    useEffect(() => {
        async function loadToken() {
            const access_token = await SecureStore.getItemAsync(ACCESS_KEY);
            const refresh_token = await SecureStore.getItemAsync(REFRESH_KEY);

            console.log(`From storage: ${access_token}, ${refresh_token}`);

            if (access_token) {
                setAuthState({
                    access_token,
                    refresh_token,
                    authenticated: true,
                });
            }
        }

        loadToken();
    }, []);

    async function register(username: string, password: string) {
        try {
            return await axios.post(`${API_URL}/auth/register`, {
                username,
                password,
            });
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    async function login(username: string, password: string) {
        try {
            const result = await axios.post(`${API_URL}/auth/login`, {
                username,
                password,
            });

            console.log(result.data);

            setAuthState({
                access_token: result.data.access_token,
                refresh_token: result.data.refresh_token,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${result.data.access_token}`;

            await SecureStore.setItemAsync(
                ACCESS_KEY,
                result.data.access_token
            );

            await SecureStore.setItemAsync(
                REFRESH_KEY,
                result.data.refresh_token
            );

            return result;
        } catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    async function refreshToken() {
        try {
            const result = await axios.post(`${API_URL}/auth/refresh-token`, {
                refresh_token: authState.refresh_token,
            });

            console.log(`Refreshed token: ${result.data.access_token}`);

            setAuthState({
                access_token: result.data.access_token,
                refresh_token: authState.refresh_token,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] =
                `Bearer ${result.data.access_token}`;

            SecureStore.setItem(ACCESS_KEY, result.data.access_token);

            return result;
        } catch (e) {
            await logout();
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    async function logout() {
        setAuthState({
            access_token: null,
            refresh_token: null,
            authenticated: false,
        });

        await SecureStore.deleteItemAsync(ACCESS_KEY);
        await SecureStore.deleteItemAsync(REFRESH_KEY);
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onRefreshToken: refreshToken,
        authState: authState,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
