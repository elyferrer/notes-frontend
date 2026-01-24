import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

const initialState = {
    loading: null,
    success: null,
    error: null,
    data: {}
};

export const getCategories = createAsyncThunk(
    'note/getCategories',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/categories`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully retrieved categories' };
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to retrieve categories' };
        });
    }
})

export default categorySlice.reducer