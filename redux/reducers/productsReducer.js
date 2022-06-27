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
    },
    removeFromCart: (state, action) => {
        const newCart = state.cart;
        const { itemCode, qty } = action.payload;
        if (itemCode in newCart) {
            newCart[itemCode]["qty"] = newCart[itemCode]["qty"] - qty
        }

        if (newCart[itemCode]["qty"] <= 0) {
            delete newCart[itemCode]
        }
        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart: (state, action) => {
        state.cart = {}
        localStorage.removeItem('cart')
        console.log('cart has been cleared')
    }
})

export default productsReducer