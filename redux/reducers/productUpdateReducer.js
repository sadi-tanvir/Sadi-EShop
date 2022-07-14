import { createReducer } from "@reduxjs/toolkit"






const initialState = {
    name: "",
    price: "",
    category: "",
    size: "",
    color: "",
    availableQty: "",
    description: "",
    img: "",
}


const productUpdateReducer = createReducer(initialState, {
    updateProduct: (state, action) => {
        state.name = action.payload.name;
        state.price = action.payload.price;
        state.category = action.payload.category;
        state.size = action.payload.size;
        state.color = action.payload.color;
        state.availableQty = action.payload.availableQty;
        state.description = action.payload.description;
        state.img = action.payload.img;
    }
})

export default productUpdateReducer