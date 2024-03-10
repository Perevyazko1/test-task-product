import {FC, lazy, Suspense} from "react";
import {EditProductPage} from "../index";
export const EditProductPageAsync = lazy<FC>(()=> import("./EditProductPage"))

export const DetailsEditProductPageComponent = () =>(
    <Suspense>
        <EditProductPageAsync/>
    </Suspense>
)