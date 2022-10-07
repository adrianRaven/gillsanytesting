import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
