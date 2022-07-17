import { createReducer } from "@reduxjs/toolkit"


const initialState = {
    menuDropDown: false,
    userDropDown: false,
    fashionDropDown: false,
    electronicsDropDown: false,
}


const globalReducer = createReducer(initialState, {
    menuDropDown: (state, action) => {
        state.menuDropDown = !state.menuDropDown
        state.userDropDown = false
        state.fashionDropDown = false
        state.electronicsDropDown = false
    },
    userDropDown: (state, action) => {
        state.userDropDown = !state.userDropDown
        state.menuDropDown = false
        state.fashionDropDown = false
        state.electronicsDropDown = false
    },
    fashionDropDown: (state, action) => {
        state.fashionDropDown = !state.fashionDropDown
        state.userDropDown = false
        state.menuDropDown = false
        state.electronicsDropDown = false
    },
    electronicsDropDown: (state, action) => {
        state.electronicsDropDown = !state.electronicsDropDown
        state.fashionDropDown = false
        state.userDropDown = false
        state.menuDropDown = false
    },
    closeDropDown: (state, action) => {
        state.fashionDropDown = false
        state.userDropDown = false
        state.menuDropDown = false
        state.electronicsDropDown = false
    }
})

export default globalReducer