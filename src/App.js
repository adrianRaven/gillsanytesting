import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SigninScreen from "./screens/SigninScreen";
import CartScreen from "./screens/CartScreen";
import AboutScreen from "./screens/AboutScreen";
import ProductsCategoriesScreen from "./screens/ProductsCategoriesScreen";
import SignupScreen from "./screens/SignupScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileScreen from "./screens/ProfileScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import AdminRoute from "./components/AdminRoute";
import DashboardScreen from "./screens/DashboardScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
const ShippingAddressScreen = lazy(() =>
  import("./screens/ShippingAddressScreen")
);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/product/:slug"
            element={
              <>
                <Navbar /> <ProductScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar /> <HomeScreen /> <Footer />
              </>
            }
          ></Route>

          <Route
            path="/signin"
            element={
              <>
                {" "}
                <Navbar /> <SigninScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                {" "}
                <Navbar /> <CartScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/acercade"
            element={
              <>
                {" "}
                <Navbar /> <AboutScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/productos"
            element={
              <>
                {" "}
                <Navbar /> <ProductsCategoriesScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {" "}
                <Navbar /> <SignupScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {" "}
                <Navbar />{" "}
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/shipping"
            element={
              <>
                {" "}
                <Navbar />{" "}
                <Suspense fallback={<div>cargando...</div>}>
                  <ShippingAddressScreen></ShippingAddressScreen>{" "}
                </Suspense>{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="/placeorder"
            element={
              <>
                {" "}
                <Navbar /> <PlaceOrderScreen /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="/order/:id"
            element={
              <>
                <Navbar /> <OrderScreen /> <Footer />
              </>
            }
          />
          <Route
            path="/orderhistory"
            element={
              <>
                <Navbar />
                <OrderHistoryScreen /> <Footer />
              </>
            }
          ></Route>
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Navbar />
                <DashboardScreen />
                <Footer />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <Navbar />
                <ProductListScreen />
              </AdminRoute>
            }
          ></Route>

          <Route
            path="/admin/products/:id"
            element={
              <AdminRoute>
                <Navbar />
                <ProductEditScreen />
              </AdminRoute>
            }
          ></Route>

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Navbar />
                <OrderListScreen />
              </AdminRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
