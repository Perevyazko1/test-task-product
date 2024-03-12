import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Photos} from "./models/Photos";
import {Args} from "./models/Args";
import {ProductTypes} from "./models/ProductTypes";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8081/",
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        getData: build.query<ProductTypes[], Args>({
            query: ({param, source}) => ({
                url: `/${source}${param}`,

            }),
            // providesTags: result => ["Post"]
        }),
        getUnit: build.query<ProductTypes, Args>({
            query: ({param, source}) => ({
                url: `/${source}${param}`,

            }),
            // providesTags: result => ["Post"]
        }),
        createUnit: build.mutation<ProductTypes, { product: ProductTypes }>({
            query: ({product}) => (
                console.log( product.packageType),
                {

                url: `/productTypes`,
                method: 'POST',
                body: {
                    "packsNumber": product.packsNumber,
                    "packageType": product.packageType,
                    "isArchived": product.isArchived,
                    "description": product.description
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Post']
        }),
        updateUnit: build.mutation<ProductTypes, { id:string, product: ProductTypes }>({
            query: ({product, id}) => ({

                url: `/productTypes/${id}`,
                method: 'PATCH',
                body: {
                    "packsNumber": product.packsNumber,
                    "packageType": product.packageType,
                    "isArchived": product.isArchived,
                    "description": product.description
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Post']
        }),
        deleteUnit: build.mutation<ProductTypes, { data: ProductTypes }>({
            query: ({data}) => ({
                url: `/productTypes`,
                method: 'DELETE',
                body: {
                    "packsNumber": data.packsNumber,
                    "packageType": data.packageType,
                    "isArchived": data.isArchived,
                    "description": data.description
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Post']
        }),

    })
})