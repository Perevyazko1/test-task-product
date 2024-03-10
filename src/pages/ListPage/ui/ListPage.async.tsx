import {FC, lazy, Suspense} from "react";
export const ListPageAsync = lazy<FC>(()=> import("./ListPage"))

export const DetailsListPageComponent = () =>(
    <Suspense>
        <ListPageAsync/>
    </Suspense>
)