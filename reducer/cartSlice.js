import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // create order
    items: [],
    method: 'Delivery',
    address: [],
    payment: [],
    voucher: [],
    fee: [
        {
            idCart: '0',
            productType: 'service',
            productId: '0',
            productName: 'Delivery Fee',
            productDescription: '-',
            productPrice: '12000',
            productDiscount: 0,
            productItem: '1',
            productUnit: '-'
        },
        {
            idCart: '0',
            productType: 'service',
            productId: '0',
            productName: 'Platform Fee',
            productDescription: '-',
            productPrice: '6000',
            productDiscount: 0,
            productItem: '1',
            productUnit: '-'
        }
    ],
    gross: '',

    // callback from create order
    callback: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        retrieveFromDB: (state, action) => {
            state.items = action.payload
        },
        retrieveMethod: (state, action) => {
            state.method = action.payload
            state.voucher = []
        },
        retrieveAddress: (state, action) => {
            state.address = action.payload
        },
        retrievePayment: (state, action) => {
            state.payment = action.payload
        },
        retreiveVoucher: (state, action) => {
            state.voucher = action.payload
        },
        removeVoucher: (state) => {
            state.voucher = []
        },
        retrieveFromMidtrans: (state, action) => {
            state.callback = action.payload
        },
        setGrossAmount: (state, action) => {
            state.gross = action.payload
        },
        clearAll: (state) => {
            state.items = []
            state.method = 'Delivery'
            state.address = []
            state.payment = []
            state.voucher = []
        }
    }
})

export const { retrieveFromDB, retrieveMethod, retrieveAddress, retrievePayment, retreiveVoucher, removeVoucher, createDataProduct, retrieveFromMidtrans, setGrossAmount, clearAll } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartItemsID = (state, id) => state.cart.items.filter((item) => item.productId === id)

export const selectMethod = (state) => state.cart.method
export const selectAddress = (state) => state.cart.address
export const selectPayment = (state) => state.cart.payment
export const selectVoucher = (state) => state.cart.voucher
export const selectGross = (state) => state.cart.gross
export const selectFee = (state) => state.cart.fee
export const selectMidtrans = (state) => state.cart.callback

export const sumTotalItem = (state) => state.cart.items.reduce((total, item) => total += Number(item.productItem), 0)
export const sumTotalPrice = (state) => state.cart.items.reduce((total, item) => total += Number(item.productPrice) * Number(item.productItem), 0)
export const sumTotalDiscount = (state) => state.cart.items.reduce((total, item) => total += item.productDiscount, 0)

export default cartSlice.reducer