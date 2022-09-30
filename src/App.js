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
        </Routes>
        <Route
          path="/signup"
          element={
            <>
              {" "}
              <Navbar /> <SignupScreen /> <Footer />{" "}
            </>
          }
        />
      </Router>
    </div>
  );
}

export default App;
