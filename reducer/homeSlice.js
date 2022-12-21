import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    category: [],
    section: [],
    data: [],
    filteredData: [],
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
        },
        logData: (state, action) => {
            state.data = action.payload.data
        },
        logFilteredData: (state, action) => {
            state.filteredData = action.payload.data
        }
    }
})

export const { logCategory, logSection, logData, logFilteredData } = homeSlice.actions;

export const selectCategory = (state) => state.home.category;

export const selectSection = (state) => state.home.section;

export const selectData = (state) => state.home.data;

export const selectFilteredData = (state) => state.home.filteredData;

export default homeSlice.reducer;