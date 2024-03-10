import {Photos} from "./models/Photos";
import {ProductTypes} from "./models/ProductTypes";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://ci41159.tw1.ru/",
        headers: {
    'Authorization': "token ab609d160173aa13aded7e95552d017221f601cd",
    'Content-Type': 'application/json'}
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        getData: build.query<Photos[],ProductTypes>({
            query:({})=>({
                url: `/` ,

        }),
            // providesTags: result => ["Post"]
        }),
})
})