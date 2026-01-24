import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

const initialState = {
    loading: null,
    success: null,
    error: null,
    data: {},
};

export const getNotes = createAsyncThunk(
    'note/getNotes',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/notes`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const getNotesByCategory = createAsyncThunk(
    'note/getNotesByCategory',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/notes/${id}`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotesByCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNotesByCategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully retrieved notes' };
        });
        builder.addCase(getNotesByCategory.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to retrieve notes' };
        });
    }
})

export default noteSlice.reducer