import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./reducers/productsReducer"
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from "./reducers/authReducer"
import globalReducer from "./reducers/globalReducer"
import productUpdateReducer from "./reducers/productUpdateReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        authReducer,
        globalReducer,
        productUpdateReducer
    }
})

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper