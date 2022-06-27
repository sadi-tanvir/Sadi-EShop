import { createReducer } from "@reduxjs/toolkit"






const initialState = {
    cart: {},
    subTotal: 0
}


const productsReducer = createReducer(initialState, {
    addToCart: (state, action) => {
        const { itemCode, qty } = action.payload;
        let newCart = state.cart;

        if (itemCode in state.cart) {
            newCart[itemCode].qty = newCart[itemCode].qty + qty
        } else {
            newCart[itemCode] = { ...action.payload }
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }
})

export default productsReducer