import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    address: [],
    token: '',
    isLogged: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loggedUser: (state, action) => {
            state.data = action.payload.data
            state.token = action.payload.token
            state.isLogged = true
        },
        addedAddress: (state, action) => {
            state.address = action.payload.address
        },
        logoutUser: (state) => {
            state.data = []
            state.token = ''
            state.isLogged = false
        }
    }
})

export const { loggedUser, logoutUser } = profileSlice.actions;

export const selectProfile = (state) => state.profile.data;

export const selectToken = (state) => state.profile.token;

export const selectLog = (state) => state.profile.isLogged;

export default profileSlice.reducer;