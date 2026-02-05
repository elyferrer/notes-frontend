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

export const getCharacterDetails = createAsyncThunk(
    'character/getDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/characters/${id}`, { withCredentials: true });
            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const createCharacter = createAsyncThunk(
    'character/create',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/characters`, formData, { withCredentials: true });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateCharacter = createAsyncThunk(
    'character/update',
    async ({id, formData}, thunkAPI) => {
        try {
            const response = await axios.patch(`${API_URL}/characters/${id}`, formData, { withCredentials: true });
        
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const deleteCharacter = createAsyncThunk(
    'character/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/characters/${id}`, { withCredentials: true });
        
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);


export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        populateSelected: (state, action) => {
            state.selected = action.payload;
        },
        resetSelected: (state) => {
            state.selected = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCharactersByCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCharactersByCategory.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully retrieved characters' };
        });
        builder.addCase(getCharactersByCategory.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to retrieve characters' };
        });

        builder.addCase(createCharacter.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCharacter.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.loading = null;
            state.success = { message: 'Successfully created character' };
        });
        builder.addCase(createCharacter.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to create character' };
        });

        builder.addCase(deleteCharacter.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCharacter.fulfilled, (state, action) => {
            state.data = state.data.filter(item => item._id != action.payload._id);
            state.loading = null;
            state.success = { message: 'Successfully deleted character' };
        });
        builder.addCase(deleteCharacter.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to delete character' };
        });

        builder.addCase(getCharacterDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCharacterDetails.fulfilled, (state, action) => {
            state.selected = action.payload;
            state.loading = null;
            state.success = { message: 'Successfully retrieved character details' };
        });
        builder.addCase(getCharacterDetails.rejected, (state, action) => {
            state.data = action.payload;
            state.loading = null;
            state.error = { message: 'Failed to retrieve character details' };
        });

        // builder.addCase(updateCharacter.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(updateCharacter.fulfilled, (state, action) => {
        //     state.selected = action.payload;
        //     state.loading = null;
        //     state.success = { message: 'Successfully updated character' };
        // });
        // builder.addCase(updateCharacter.rejected, (state, action) => {
        //     state.data = action.payload;
        //     state.loading = null;
        //     state.error = { message: 'Failed to update character' };
        // });
    }
})

export const { populateSelected, resetSelected } = characterSlice.actions

export default characterSlice.reducer