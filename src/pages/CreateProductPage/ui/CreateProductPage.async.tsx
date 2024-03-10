import {FC, lazy, Suspense} from "react";
import {CreateProductPage} from "../index";
export const CreateProductPageAsync = lazy<FC>(()=> import("./CreateProductPage"))

export const DetailsCreateProductPageComponent = () =>(
    <Suspense>
        <CreateProductPageAsync/>
    </Suspense>
)