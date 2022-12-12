import "../css/HomeScreen.css";
import Product from "../components/Product";
import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Slider from "../components/slider/Slider";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload.data, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload.data };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/product"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <main className="main">
      <div className="home">
        <Slider></Slider>
        <div>
          <h1>
            ESTAMOS TRABAJANDO EN EL SITIO - PROXIMAMENTE INAUGURACION DEL SITIO
            WEB
          </h1>
        </div>
        <div className="ofertas-contenedor">
          <div className="contenedor-producto">
            <div className="title-section">Ofertas</div>
            <div>
              {" "}
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error} </MessageBox>
              ) : (
                <div className="flex__container">
                  <Product products={products.slice(0, 4)} />
                </div>
              )}{" "}
            </div>
          </div>

          <div className="contenedor-producto"></div>
        </div>
      </div>
    </main>
  );
}

export default HomeScreen;
