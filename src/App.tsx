import './styles/styles.scss';
//import styles from  "./App.module.scss";
import { observer } from 'mobx-react-lite';
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "components/Header";
import ProductPage from "pages/product";
import ListProductsPage from "pages/products";
import CategoriesPage from "./pages/categories";

const App: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ListProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  )
});

export default App;
