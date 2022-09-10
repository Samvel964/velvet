import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {},
        token: '',
        favorites: [],
        favoritesId: [],
        cartAddId: [],
        state:0,
    },
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload.user
            state.token = action.payload.token
            state.favorites = action.payload.user.favorites
            // state.favorites = action.payload.user.favorites
            localStorage.setItem('Token','Bearer ' + action?.payload?.token)
        },
        setFavorites: (state, action) => {
            state.favorites.push(action.payload)
        },
        setFavoritesId: (state, action) => {
            state.favoritesId = action.payload
        },
        setCartAddId: (state, action) => {
            state.cartAddId = action.payload
        },
        setState: (state) => {
            state.state += 1
        }
    }
})

export const { setUserData, setFavorites, setFavoritesId, setCartAddId, setState } = userSlice.actions

export default userSlice.reducer
