import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        data : {},
        unauthorized: false,
    },
    reducers: {
        setErrors: (state, action) => {
            state.data = action.payload
        },
        setUnauthorized: (state, action) => {
            state.unauthorized = action.payload
        }
    }
})

export const { setErrors, setUnauthorized } = errorSlice.actions

export default errorSlice.reducer
