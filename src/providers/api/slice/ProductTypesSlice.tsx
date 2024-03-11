import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductTypes} from "../models/ProductTypes";


const initialState: ProductTypes[] = [{
        id: "",
        packsNumber: 0,
        packageType: "",
        isArchived: false,
        description: "",
        createdAt: ""

}]

export const ProductTypesSlice = createSlice({
    name: 'productTypes',
    initialState,
    reducers: {
        isProductType(state, action: PayloadAction<ProductTypes[]>) {
            state = action.payload.map((item) => item);
            console.log(state)
        },

    }
})

export default ProductTypesSlice.reducer;