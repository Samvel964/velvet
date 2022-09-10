import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name:'products',
    initialState: {
        products: [],
        productTags: '',
        productsByTag: [],
        isAll: false
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setProductTag: (state, action) => {
            state.productTags = action.payload
        },
        setProductsByTag: state => {
            state.productsByTag.push(state.products.filter(product => product.productTag === state.productTags))
        },
        setIsAll: (state, action) => {
            state.isAll = action.payload
        }
    }
})

export const { setProducts, setProductTag, setProductsByTag, setIsAll } = productSlice.actions

export default productSlice.reducer
