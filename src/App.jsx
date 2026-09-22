
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import CategoryNav from "./components/layout/CategoryNav";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/layout/Footer";

import ProtectedRoute from "./components/common/ProtectedRoute";

function AppContent() {
  const location = useLocation();

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <CategoryNav />}

      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-100 px-4 py-20 text-center">
                <h1 className="text-5xl font-bold text-gray-800">
                  404
                </h1>

                <p className="mt-3 text-gray-500">
                  Page not found.
                </p>
              </div>
            }
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
