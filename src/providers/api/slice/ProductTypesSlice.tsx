import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductTypes} from "../models/ProductTypes";

export interface SliceProduct {
    product:ProductTypes[]
}


const initialState: SliceProduct = {
    product:[{
                id: "",
        packsNumber: 0,
        packageType: "",
        isArchived: false,
        description: "",
        createdAt: ""

    }]

}

export const ProductTypesSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {
        isProductType(state, action: PayloadAction<ProductTypes[]>) {
            state.product = action.payload
        },

    }
})
export const { isProductType } = ProductTypesSlice.actions

export default ProductTypesSlice.reducer;