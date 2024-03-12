import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductTypes} from "../models/ProductTypes";

export interface SliceProductEdit {
    product: ProductTypes
}


const initialState: SliceProductEdit = {
    product: {
        id: "",
        packsNumber: 0,
        packageType: "не компрессия",
        isArchived: false,
        description: "",
        createdAt: ""

    }

}

export const TypesEditSlice = createSlice({
    name: 'typesEdit',
    initialState,
    reducers: {
        typesEdit(state, action: PayloadAction<ProductTypes>) {
            state.product = action.payload
        },
        packsNumber(state, action: PayloadAction<number>) {
            state.product.packsNumber = action.payload
        },
        packageType(state, action: PayloadAction<string>) {
            state.product.packageType = action.payload
        },
        isArchived(state, action: PayloadAction<boolean>) {
            state.product.isArchived = action.payload
        },
        description(state, action: PayloadAction<string>) {
            state.product.description = action.payload
        },
        resetToInitialState(state) {
            state.product = initialState.product; // Сбросить все поля к исходному initialState
        },

    }
})
export const {typesEdit} = TypesEditSlice.actions

export default TypesEditSlice.reducer;