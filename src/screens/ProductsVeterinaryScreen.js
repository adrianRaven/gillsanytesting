import React from "react";
import Product from "../components/Product";
import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../css/ProductsCategoriesScreen.css";

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

export default function ProductsVeterinaryScreen() {
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
  const pVetArray = products?.filter(
    (p) =>
      p.categories.filter((c) => c.name.toLowerCase() === "veterinaria")
        .length > 0
  );
  return (
    <div className="products__main__container">
      <div className="products__banner">
        {" "}
        <img
          alt="verification mail"
          src={require(`../img/bannerproductos.jpg`)}
        />
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <>
          <div className="products__title__category">Ultrasonidos</div>
          {pVetArray.filter(
            (p) =>
              p.categories.filter(
                (c) => c.name.toLowerCase() === "ultrasonidos"
              ).length > 0
          ).length > 0 ? (
            <Product
              products={pVetArray
                .slice(0, 12)
                .filter(
                  (p) =>
                    p.categories.filter(
                      (c) => c.name.toLowerCase() === "ultrasonidos"
                    ).length > 0
                )}
            />
          ) : (
            <div className="products__no__available">
              Próximamente nuevos productos
            </div>
          )}
        </>
      )}{" "}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <>
          <div className="products__title__category">Electrocauterios</div>
          {pVetArray.filter(
            (p) =>
              p.categories.filter(
                (c) => c.name.toLowerCase() === "electrocauterios"
              ).length > 0
          ).length > 0 ? (
            <Product
              products={pVetArray
                .slice(0, 12)
                .filter(
                  (p) =>
                    p.categories.filter(
                      (c) => c.name.toLowerCase() === "electrocauterios"
                    ).length > 0
                )}
            />
          ) : (
            <div className="products__no__available">
              Próximamente nuevos productos
            </div>
          )}
        </>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <>
          <div className="products__title__category">Electrocardiografos</div>
          {pVetArray.filter(
            (p) =>
              p.categories.filter(
                (c) => c.name.toLowerCase() === "electrocardiografos"
              ).length > 0
          ).length > 0 ? (
            <Product
              products={pVetArray
                .slice(0, 12)
                .filter(
                  (p) =>
                    p.categories.filter(
                      (c) => c.name.toLowerCase() === "electrocardiografos"
                    ).length > 0
                )}
            />
          ) : (
            <div className="products__no__available">
              Próximamente nuevos productos
            </div>
          )}
        </>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <>
          <div className="products__title__category">Monitores</div>
          {pVetArray.filter(
            (p) =>
              p.categories.filter((c) => c.name.toLowerCase() === "monitores")
                .length > 0
          ).length > 0 ? (
            <Product
              products={pVetArray
                .slice(0, 12)
                .filter(
                  (p) =>
                    p.categories.filter(
                      (c) => c.name.toLowerCase() === "monitores"
                    ).length > 0
                )}
            />
          ) : (
            <div className="products__no__available">
              Próximamente nuevos productos
            </div>
          )}
        </>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <>
          <div className="products__title__category">Accesorios</div>
          {pVetArray.filter(
            (p) =>
              p.categories.filter((c) => c.name.toLowerCase() === "accesorios")
                .length > 0
          ).length > 0 ? (
            <Product
              products={pVetArray
                .slice(0, 12)
                .filter(
                  (p) =>
                    p.categories.filter(
                      (c) => c.name.toLowerCase() === "accesorios"
                    ).length > 0
                )}
            />
          ) : (
            <div className="products__no__available">
              Próximamente nuevos productos
            </div>
          )}
        </>
      )}
    </div>
  );
}
