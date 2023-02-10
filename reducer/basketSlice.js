import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    address: [],
    deliveryMethod: 'Delivery',
    payment: [],
    voucher: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (item) => item.productID === action.payload.id
            );

            let newBasket = [...state.items];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.payload.id})`
                );
            }

            state.items = newBasket;
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setMethod: (state, action) => {
            state.deliveryMethod = action.payload
            state.voucher = []
        },
        removeVoucher: (state) => {
            state.voucher = []
        },
        setPayment: (state, action) => {
            state.payment = action.payload
        },
        setVoucher: (state, action) => {
            state.voucher = action.payload
        },
    }
})

export const { addToBasket, removeFromBasket, setAddress, setMethod, setPayment, setVoucher, removeVoucher } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectMethod = (state) => state.basket.deliveryMethod;

export const selectAddress = (state) => state.basket.address;

export const selectPayment = (state) => state.basket.payment;

export const selectVoucher = (state) => state.basket.voucher;
export const selectVoucherId = (state, id) => 
    state.basket.voucher.filter((item) => item.id === id);

export const selectBasketWithID = (state, id) =>
    state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0);

export const selectBasketDiscount = (state) => state.basket.items.reduce((total, item) => total += item.discount, 0);

export default basketSlice.reducer;