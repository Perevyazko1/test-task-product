import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {ListPage} from "../pages/ListPage";
import {CreateProductPage} from "../pages/CreateProductPage";
import {EditProductPage} from "../pages/EditProductPage";

function App() {
  return (
    <>
        <Routes>
            <Route path={"/"} element={<ListPage/>}/>
            <Route path={"/create_product"} element={<CreateProductPage/>}/>
            <Route path={"/edit_product/:id"} element={<EditProductPage/>}/>
        </Routes>
    </>
  );
}

export default App;
