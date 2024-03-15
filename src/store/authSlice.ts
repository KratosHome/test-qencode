import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface authState {
    accessToken: string | null;
    refreshToken: string | null;
    tokenExpire: number | null;
    refreshTokenExpire: number | null;
    timestamp: number | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: authState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    tokenExpire: Number(localStorage.getItem('tokenExpire')),
    refreshTokenExpire: Number(localStorage.getItem('tokenExpire')),
    timestamp: Number(localStorage.getItem('timestamp')),
    status: 'idle',
    error: null
}

export const authReducer = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
        },
        loginSuccess: (state, action: PayloadAction<{
            accessToken: string;
            refreshToken: string,
            tokenExpire: number,
            refreshTokenExpire: number,
            timestamp: number
        }>) => {
            const {accessToken, refreshToken, tokenExpire, refreshTokenExpire, timestamp} = action.payload;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('tokenExpire', tokenExpire.toString());
            localStorage.setItem('refreshTokenExpire', refreshTokenExpire.toString());
            localStorage.setItem('timestamp', timestamp.toString());
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.tokenExpire = tokenExpire;
            state.refreshTokenExpire = refreshTokenExpire;
            state.timestamp = timestamp;
            state.status = 'succeeded';
            state.error = null;
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenExpire');
            localStorage.removeItem('refreshTokenExpire');
            localStorage.removeItem('timestamp');
            state.accessToken = null;
            state.refreshToken = null;
            state.tokenExpire = null;
            state.refreshTokenExpire = null;
            state.timestamp = null;
            state.status = 'idle';
        },
        refreshToken: (state, action: PayloadAction<{ accessToken: string }>) => {
            const {accessToken} = action.payload;
            localStorage.setItem('accessToken', accessToken);
            state.accessToken = accessToken;
        },
    },
})

export const {loginStart, loginSuccess, loginFailed, refreshToken} = authReducer.actions

export default authReducer.reducer