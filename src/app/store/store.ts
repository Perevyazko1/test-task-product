import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {postApi} from "providers/api/RtkService";
import ProductTypesSlice from "providers/api/slice/ProductTypesSlice"
import TypesEditSlice from "providers/api/slice/TypesEditSlice"

const rootReducer = combineReducers({
    ProductTypesSlice,
    TypesEditSlice,



    [postApi.reducerPath]: postApi.reducer
})

export const setupStore =() => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApi.middleware)
    })
}
export type RootState = ReturnType<typeof  rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type  AppDispatch = AppStore["dispatch"]
