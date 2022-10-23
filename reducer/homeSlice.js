import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: [],
    section: [],
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        logCategory: (state, action) => {
            state.category = action.payload.data
        },
        logSection: (state, action) => {
            state.section = action.payload.data
        }
    }
})

export const { logCategory, logSection } = homeSlice.actions;

export const selectCategory = (state) => state.home.category;

export const selectSection = (state) => state.home.section;

export default homeSlice.reducer;