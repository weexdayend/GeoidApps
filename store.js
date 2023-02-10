import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'

import ProfileReducer from './reducer/profileSlice'
import BasketReducer from './reducer/basketSlice'
import HomeReducer from './reducer/homeSlice'
import CartReducer from './reducer/cartSlice'
import GeoReducer from './reducer/geoSlice'

export const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        home: HomeReducer,
        basket: BasketReducer,
        cart: CartReducer,
        geo: GeoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})