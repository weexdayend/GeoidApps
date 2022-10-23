import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    data: [],
    token: '',
    isLogged: false,
}

const _store = async (payload) => {
    try {
        await AsyncStorage.setItem('_logdata', JSON.stringify(payload.data))
        await AsyncStorage.setItem('_logtoken', JSON.stringify(payload.token))
    } catch(e) {
        console.log(e)
    }
}

const _clear = async () => {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        console.log(e)
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loggedUser: (state, action) => {
            state.data = action.payload.data
            state.token = action.payload.token
            state.isLogged = true
            _store(action.payload)
        },
        logoutUser: (state) => {
            state.data = []
            state.token = ''
            state.isLogged = false
            _clear()
        }
    }
})

export const { loggedUser, logoutUser } = profileSlice.actions;

export const selectProfile = (state) => state.profile.data;

export const selectToken = (state) => state.profile.token;

export const selectLog = (state) => state.profile.isLogged;

export default profileSlice.reducer;