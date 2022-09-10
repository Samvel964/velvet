import { Routes, Route,} from "react-router-dom";
import { MainLayout } from "./layout";
import { Home } from "./pages/Home/home";
import { AllProducts } from "./pages/AllProducts";
import { Product } from "./pages/Product";
import { Cart } from "./pages/CartPage";
import { Contact } from "./pages/Contact";

export const ProjectRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/velvet" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/contact" element={<Contact/>} />
            </Route>
            <Route path="*" element={"Error page"} />            
        </Routes>
    )
}
