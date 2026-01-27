import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

const initialState = {
    loading: null,
    success: null,
    error: null,
    data: [{}],
    selectedNote: {}
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

export const getNoteDetails = createAsyncThunk(
    'note/getNotes',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/notes/details/${id}`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const updateNote = createAsyncThunk(
    'note/updateNote',
    async ({id, formData}, thunkAPI) => {
        console.log('update', id, formData);
        try {
            const response = await axios.patch(`${API_URL}/notes/${id}`, formData, { withCredentials: true });
        
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

        builder.addCase(getNoteDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNoteDetails.fulfilled, (state, action) => {
            state.selectedNote = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully retrieved note details' };
        });
        builder.addCase(getNoteDetails.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to retrieve note details' };
        });

        builder.addCase(updateNote.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateNote.fulfilled, (state, action) => {
            state.selectedNote = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully update note' };
        });
        builder.addCase(updateNote.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to update note' };
        });
    }
})

export default noteSlice.reducer