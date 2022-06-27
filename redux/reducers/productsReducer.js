import { createReducer } from "@reduxjs/toolkit"






const initialState = {
    cart: {},
}


const productsReducer = createReducer(initialState, {
    // add product to the cart
    addToCart: (state, action) => {
        const { productId, qty } = action.payload;
        let newCart = state.cart;

        if (productId in state.cart) {
            newCart[productId].qty = newCart[productId].qty + qty
        } else {
            newCart[productId] = { ...action.payload }
        }

        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    // remove product or decrement quantity from the cart  
    removeFromCart: (state, action) => {
        const newCart = state.cart;
        const { productId, qty } = action.payload;
        if (productId in newCart) {
            newCart[productId]["qty"] = newCart[productId]["qty"] - qty
        }

        if (newCart[productId]["qty"] <= 0) {
            delete newCart[productId]
        }
        state.cart = newCart
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    // clear cart data
    clearCart: (state, action) => {
        state.cart = {}
        localStorage.removeItem('cart')
        console.log('cart has been cleared')
    },


    reloadCart: (state, action) => {
        state.cart = action.payload
    }
})

export default productsReducer