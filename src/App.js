import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutScreen from "./screens/AboutScreen";
import ProductsCategoriesScreen from "./screens/ProductsCategoriesScreen";
import SignupScreen from "./screens/SignupScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileScreen from "./screens/ProfileScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

const CartScreen = lazy(() => import("./screens/CartScreen"));
const SigninScreen = lazy(() => import("./screens/SigninScreen"));
const ProductScreen = lazy(() => import("./screens/ProductScreen"));

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
                <Navbar /> <ShippingAddressScreen /> <Footer />{" "}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
