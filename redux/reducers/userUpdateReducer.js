import { createReducer } from "@reduxjs/toolkit"






const initialState = {
    name: "",
    email: "",
    phone: "",
    role: "",
    isActive: "",
    address: "",
    img: ""
}


const userUpdateReducer = createReducer(initialState, {
    updateUser: (state, action) => {
        state.name = action.payload.name
        state.email = action.payload.email
        state.phone = action.payload.phone
        state.role = action.payload.role
        state.isActive = action.payload.isActive
        state.address = action.payload.address
        state.img = action.payload.img
    }
})

export default userUpdateReducer