import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductTypes} from "../models/ProductTypes";



const initialState: ProductTypes = {

    packsNumber: 15,
    packageType: "компрессия",
    isArchived: false,
    description: "Описание продукции\nВ несколько строк"
}

export const ProductTypesSlice = createSlice({
    name: 'ProductTypes',
    initialState,
    reducers: {
        isProductType(state, action: PayloadAction<ProductTypes>) {
            state = action.payload
        },

    }
})

export default ProductTypesSlice.reducer;