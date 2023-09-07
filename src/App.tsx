import './App.scss';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import ProductPage from "./pages/product";
import ListProductsPage from "./pages/products";
import Header from "./components/Header";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/products" element={<ListProductsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
