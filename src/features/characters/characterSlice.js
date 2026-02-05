import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

const initialState = {
    loading: null,
    success: null,
    error: null,
    data: [],
    selected: {}
};

// export const getNotes = createAsyncThunk(
//     'note/getNotes',
//     async ({}, thunkAPI) => {
//         try {
//             const response = await axios.get(`${API_URL}/notes`, { withCredentials: true });
            
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// );

export const getCharactersByCategory = createAsyncThunk(
    'character/getCharactersByCategory',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/characters/category/${id}`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

// export const getNoteDetails = createAsyncThunk(
//     'note/getNotes',
//     async (id, thunkAPI) => {
//         try {
//             const response = await axios.get(`${API_URL}/notes/details/${id}`, { withCredentials: true });
            
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// );

// export const createNote = createAsyncThunk(
//     'note/create',
//     async (formData, thunkAPI) => {
//         try {
//             const response = await axios.post(`${API_URL}/notes`, formData, { withCredentials: true });

//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// )

// export const updateNote = createAsyncThunk(
//     'note/updateNote',
//     async ({id, formData}, thunkAPI) => {
//         try {
//             const response = await axios.patch(`${API_URL}/notes/${id}`, formData, { withCredentials: true });
        
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// );

// export const deleteNote = createAsyncThunk(
//     'note/deleteNote',
//     async (id, thunkAPI) => {
//         try {
//             const response = await axios.delete(`${API_URL}/notes/${id}`, { withCredentials: true });
        
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// );


export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCharactersByCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCharactersByCategory.fulfilled, (state, action) => {
            console.log('payload', action.payload);
            state.data = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully retrieved characters' };
        });
        builder.addCase(getCharactersByCategory.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to retrieve characters' };
        });

        // builder.addCase(getNoteDetails.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(getNoteDetails.fulfilled, (state, action) => {
        //     state.selectedNote = action.payload;
        //     state.loading = null;
        //     state.success = { message: 'Successfully retrieved note details' };
        // });
        // builder.addCase(getNoteDetails.rejected, (state, action) => {
        //     state.data = action.payload;
        //     state.loading = null;
        //     state.error = { message: 'Failed to retrieve note details' };
        // });

        // builder.addCase(updateNote.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(updateNote.fulfilled, (state, action) => {
        //     state.selectedNote = action.payload;
        //     state.loading = null;
        //     state.success = { message: 'Successfully updated note' };
        // });
        // builder.addCase(updateNote.rejected, (state, action) => {
        //     state.data = action.payload;
        //     state.loading = null;
        //     state.error = { message: 'Failed to update note' };
        // });

        // builder.addCase(createNote.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(createNote.fulfilled, (state, action) => {
        //     state.data.push(action.payload);
        //     state.loading = null;
        //     state.success = { message: 'Successfully created note' };
        // });
        // builder.addCase(createNote.rejected, (state, action) => {
        //     state.data = action.payload;
        //     state.loading = null;
        //     state.error = { message: 'Failed to create note' };
        // });

        // builder.addCase(deleteNote.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(deleteNote.fulfilled, (state, action) => {
        //     state.data = state.data.filter(item => item._id != action.payload._id);
        //     state.loading = null;
        //     state.success = { message: 'Successfully deleted note' };
        // });
        // builder.addCase(deleteNote.rejected, (state, action) => {
        //     state.data = action.payload;
        //     state.loading = null;
        //     state.error = { message: 'Failed to delete note' };
        // });
    }
})

export default characterSlice.reducer