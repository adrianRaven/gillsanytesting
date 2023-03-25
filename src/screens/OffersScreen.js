import React from "react";
import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Product from "../components/Product";
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
export default function OffersScreen() {
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
    <div>
      <div className="offers__title">Ofertas</div>

      <div>Todas las Ofertas</div>
      <Product
        products={products.slice(0, 12).filter((product) => {
          return product.discount > 0;
        })}
      />
    </div>
  );
}
