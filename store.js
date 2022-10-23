import { configureStore } from "@reduxjs/toolkit";

import ProfileReducer from './reducer/profileSlice'
import BasketReducer from './reducer/basketSlice'
import HomeReducer from './reducer/homeSlice'

export const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        home: HomeReducer,
        basket: BasketReducer,
    }
})