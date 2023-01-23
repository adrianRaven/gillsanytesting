import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import "../css/DashboardScreen.css";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST_USERS":
      return { ...state, loading: true };
    case "FETCH_SUCCESS_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_FAIL_USERS":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_REQUEST_PRODUCTS":
      return { ...state, loading: true };
    case "FETCH_SUCCESS_PRODUCTS":
      return { ...state, products: action.payload.data, loading: false };
    case "FETCH_FAIL_PRODUCTS":
      return { ...state, loading: false, error: action.payload.data };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const [{ loading, error, users, products }, dispatch] = useReducer(reducer, {
    users: [],
    products: [],
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST_USERS" });
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/user/",
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS_USERS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL_USERS",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchDataProd = async () => {
      dispatch({ type: "FETCH_REQUEST_PRODUCTS" });
      try {
        const result = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/product"
        );
        dispatch({ type: "FETCH_SUCCESS_PRODUCTS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL_PRODUCTS", payload: err.message });
      }
    };
    fetchDataProd();
  }, []);
  console.log(users.data?.length);
  return (
    <div className="dashboard__container">
      <div className="dashboad__section__one">
        <div className="section__one__title">Tablero de Administrador</div>{" "}
        <div className="section__one__summary">
          <div className="summary__item__label">Número de usuarios:</div>

          <div className="section__one__summary__item">
            {" "}
            <div className="summary__item_important">{users.data?.length} </div>
          </div>
          <div className="summary__item__label">Número de Productos:</div>
          <div className="section__one__summary__item">
            {" "}
            <div className="summary__item_important">{products?.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
