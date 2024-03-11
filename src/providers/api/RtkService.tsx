import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Photos} from "./models/Photos";
import {Args} from "./models/Args";
import {ProductTypes} from "./models/ProductTypes";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:8081/",
        headers: {
    'Content-Type': 'application/json'}
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        getData: build.query<ProductTypes[],Args>({
            query:({param , source})=>({
                url: `/${source}${param}` ,

        }),
            // providesTags: result => ["Post"]
        }),
        getUnit: build.query<ProductTypes,Args>({
            query:({param , source})=>({
                url: `/${source}${param}` ,

        }),
            // providesTags: result => ["Post"]
        }),
})
})