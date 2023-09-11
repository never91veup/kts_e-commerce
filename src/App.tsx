import './styles/styles.scss';
import {observer} from 'mobx-react-lite';
import * as React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from "components/Header";
import AboutUsPage from "pages/aboutUs";
import CategoriesPage from "pages/categories";
import ProductPage from "pages/product";
import ListProductsPage from "pages/products";

const App: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/about-us" element={<AboutUsPage/>}/>
        <Route path="/categories" element={<CategoriesPage/>}/>
        <Route path="/products" element={<ListProductsPage/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
        <Route path="*" element={<Navigate to="/products" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
});

export default App;
