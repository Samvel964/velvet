import { createSlice } from "@reduxjs/toolkit";


export const configSlice = createSlice({
    name: 'configs',
    initialState: {
        loader: false
    },
    reducers: {
        setLoader: (state, action) => {
            state.loader = action.payload
        }
    }
})

export const { setLoader } = configSlice.actions

export default configSlice.reducer
