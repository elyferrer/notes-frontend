import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import noteSlice from "../features/notes/noteSlice";
import categorySlice from "../features/categories/categorySlice";
import characterSlice from "../features/characters/characterSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        note: noteSlice,
        category: categorySlice,
        character: characterSlice
    }
});