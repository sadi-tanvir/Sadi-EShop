import { createReducer } from "@reduxjs/toolkit"


const initialState = {
    menuDropDown: false,
    userDropDown: false,
    fashionDropDown: false,
}


const globalReducer = createReducer(initialState, {
    menuDropDown: (state, action) => {
        state.menuDropDown = !state.menuDropDown
        state.userDropDown = false
        state.fashionDropDown = false
    },
    userDropDown: (state, action) => {
        state.userDropDown = !state.userDropDown
        state.menuDropDown = false
        state.fashionDropDown = false
    },
    fashionDropDown: (state, action) => {
        state.fashionDropDown = !state.fashionDropDown
        state.userDropDown = false
        state.menuDropDown = false
    },

})

export default globalReducer