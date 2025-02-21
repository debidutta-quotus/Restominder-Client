import { Routes, Route } from 'react-router-dom';
import Home from '../pages/homePage/Index'; // Import your page components
import ProductList from '../pages/ProductList';
import ProductDetails from '../pages/ProductDetails'; // For dynamic routes
import NotFound from '../pages/notFound/Index'; 

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} /> {/* Dynamic route */}
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
    )
}

export default AppRoutes;