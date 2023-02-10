import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchText : '',
    filter : [],
    activeFilter: 'All',
    product : [],
    searchParam : ["productName", "productUnit"]
}

export const geoSlice = createSlice({
    name: 'geo',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchText = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
    }
})

export const { setSearch, setFilter, setActiveFilter, setProduct } = geoSlice.actions

export const selectSearch = (state) => state.geo.searchText
export const selectFilter = (state) => state.geo.filter
export const selectActiveFilter = (state) => state.geo.activeFilter
export const selectProduct = (state) => state.geo.product
export const selectSearchParam = (state) => state.geo.searchParam

export default geoSlice.reducer