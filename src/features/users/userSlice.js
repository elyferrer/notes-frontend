import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

const initialState = {
    loading: null,
    success: null,
    error: null,
    data: {},
    isLoggedIn: localStorage.getItem('is_logged_in')
};

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                username,
                password
            }, { withCredentials: true });

            localStorage.setItem('is_logged_in', true);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${API_URL}/users/logout`, { withCredentials: true });
            localStorage.clear();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.success = { message: 'Login Successful' };
        });
        builder.addCase(login.rejected, (state) => {
            state.error = { message: 'Login failed' };
        });
        builder.addCase(getUserDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.data = action.payload;
            state.success = { message: 'Data successfully retrieved' };
        });
        builder.addCase(getUserDetails.rejected, (state, action) => {
            state.data = action.payload;
            state.error = { message: 'Data failed to retrieve!' };
        });
    }
})

export default userSlice.reducer