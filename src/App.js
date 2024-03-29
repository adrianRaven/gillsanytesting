import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import HomeScreen from "./screens/HomeScreen";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import CartScreen from "./screens/CartScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const AboutScreen = lazy(() => import("./screens/AboutScreen"));
const ProductsCategoriesScreen = lazy(() =>
  import("./screens/ProductsCategoriesScreen")
);
const ProductsVeterinaryScreen = lazy(() =>
  import("./screens/ProductsVeterinaryScreen")
);
const ProfileScreen = lazy(() => import("./screens/ProfileScreen"));
const OffersScreen = lazy(() => import("./screens/OffersScreen"));
const OrderScreen = lazy(() => import("./screens/OrderScreen"));
const OrderHistoryScreen = lazy(() => import("./screens/OrderHistoryScreen"));

const CategoryListScreen = lazy(() => import("./screens/CategoryListScren"));
const CategoryEditScreen = lazy(() => import("./screens/CategoryEditScreen"));
const ProductEditScreen = lazy(() => import("./screens/ProductEditScreen"));
const ConfirmationScreen = lazy(() => import("./screens/ConfirmationScreen"));

const DashboardScreen = lazy(() => import("./screens/DashboardScreen"));
const ProductListScreen = lazy(() => import("./screens/ProductListScreen"));
const OrderListScreen = lazy(() => import("./screens/OrderListScreen"));
const ShippingAddressScreen = lazy(() =>
  import("./screens/ShippingAddressScreen")
);

const ProductScreen = lazy(() => import("./screens/ProductScreen"));
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
            path="/confirmation"
            element={
              <>
                <Navbar /> <ConfirmationScreen /> <Footer />
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
                <Navbar />
                <CartScreen></CartScreen> <Footer />{" "}
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
            path="/ofertas"
            element={
              <>
                {" "}
                <Navbar /> <OffersScreen /> <Footer />{" "}
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
            path="/productos-veterinaria"
            element={
              <>
                {" "}
                <Navbar /> <ProductsVeterinaryScreen /> <Footer />{" "}
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
            path="/admin/categories/:id"
            element={
              <AdminRoute>
                <Navbar />
                <CategoryEditScreen />
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

          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <Navbar />
                <CategoryListScreen />
              </AdminRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
