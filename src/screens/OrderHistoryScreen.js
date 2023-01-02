import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getError } from "../utils";
import "../css/OrderHistoryScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + `/purchase`,

          { headers: { authorization: `Bearer ${userInfo.data.accessToken}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div className="oh__contenedor">
      <div className="oh_title">Historial de Compras</div>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <div>
          <div className="contenedor-tabla-user">
            <div className="tabla-ordenes-user">
              <div className="tabla-row-id-user header-tabla">ID</div>
              <div className="tabla-row-createdAt header-tabla">FECHA</div>
              <div className="tabla-row-totalPrice header-tabla">TOTAL</div>
              <div className="tabla-row-isPaid header-tabla">PAGADO</div>
              <div className="tabla-row-isDelivered header-tabla">
                ENTREGADO
              </div>
              <div className="tabla-row-order header-tabla">IR A ORDEN</div>
              {orders.data.map((order) => (
                <>
                  <div className="tabla-row-id-user">{order.id}</div>
                  <div className="tabla-row-createdAt">
                    {order.createdAt.substring(0, 10)}
                  </div>
                  <div className="tabla-row-totalPrice">
                    ${order.totalPrice}
                  </div>
                  <div className="tabla-row-isPaid">
                    {order.isPaid ? (
                      <div className="txt-pagado">
                        {"Pagado el " + order.paidAt.substring(0, 10)}
                      </div>
                    ) : (
                      <div className="txt-noPagado">No pagado</div>
                    )}
                  </div>
                  <div className="tabla-row-isDelivered">
                    {order.isDelivered ? (
                      <div variant="success">
                        Envíado el {order.deliveredAt}
                      </div>
                    ) : (
                      <div className="box-status">
                        <strong>No envíado</strong>
                      </div>
                    )}
                  </div>
                  <div className="tabla-row-order">
                    <button
                      type="button"
                      className="button-action-order"
                      onClick={() => {
                        navigate(`/order/${order.id}`);
                      }}
                    >
                      Detalles
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
