import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import "../css/OrderListScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING +
            {
              headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
            }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <title>Orders</title>
      {loading ? (
        <div>cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div>
            <div>
              <h1 className="titulo-lista-ordenes">Ordenes</h1>
            </div>
          </div>
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div>
              <div className="contenedor-tabla-lista-ordenes">
                <div className="tabla-ordenes">
                  {" "}
                  <div className="tabla-row-id header-tabla">ID</div>
                  <div className="tabla-row-user header-tabla">Usuario</div>
                  <div className="tabla-row-date header-tabla">Fecha</div>
                  <div className="tabla-row-total header-tabla">Total</div>
                  <div className="tabla-row-paid header-tabla">Pagado</div>
                  <div className="tabla-row-deliver header-tabla">
                    Entregado
                  </div>
                  <div className="tabla-row-actions header-tabla">Acciones</div>
                  {orders.data.map((order) => (
                    <>
                      <div className="tabla-row-id">{order.id}</div>
                      <div className="tabla-row-user">
                        {order.user ? order.user.name : "DELETED USER"}
                      </div>
                      <div className="tabla-row-date">
                        {order.createdAt.substring(0, 10)}
                      </div>
                      <div className="tabla-row-total">{order.totalPrice}</div>
                      <div className="tabla-row-paid">
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </div>
                      <div className="tabla-row-deliver">
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "No"}
                      </div>
                      <div className="tabla-row-edit">
                        {" "}
                        <button
                          type="button"
                          className="button-edit"
                          onClick={() => navigate(`/order/${order.id}`)}
                        >
                          Editar
                        </button>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
