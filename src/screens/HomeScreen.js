import "../css/HomeScreen.css";
import Product from "../components/Product";
import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";

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
          "https://gillsanyback.herokuapp.com/api/product"
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
        <div className="banner-pagos">PAGINA EN MANTENIMIENTO</div>

        <div className="recomendaciones">
          <div className="section-header">
            <div className="section-header title-section">
              Recomendaciones
              <div className="contenedor-producto">
                <Product products={products.slice(0, 5)} />
              </div>
            </div>
          </div>
          <div className="contenedor-producto"></div>
        </div>

        <div className="recomendaciones">
          <div className="section-header">
            <div className="section-header title-section">Ofertas</div>
          </div>
          <div className="contenedor-producto"></div>
        </div>
      </div>
    </main>
  );
}

export default HomeScreen;
