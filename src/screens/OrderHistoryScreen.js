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
      <div className="oh_title">Mi historial de Compras</div>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <div className="my__history__container">
          {orders.data.length > 0 ? (
            <div>
              {" "}
              {orders.data((order) => (
                <div className="item__order__history">
                  <div className="tabla-row-id-user">
                    Número de la compra: {order.id}
                  </div>
                  <div className="tabla-row-createdAt">
                    Fecha: {order.createdAt.substring(0, 10)}
                  </div>
                  <div className="tabla-row-totalPrice">
                    Total: ${order.totalPrice}
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
                    {" "}
                    {order.isDelivered ? (
                      <div className="txt-pagado">
                        {order.deliveredAt.substring(0, 10)}
                      </div>
                    ) : (
                      <>
                        Estatus de envío:
                        <div className="box-status">Pendiente</div>
                      </>
                    )}
                  </div>
                  <div className="tabla-row-order">
                    <button
                      type="button"
                      className="button-action-order"
                      onClick={() => {
                        navigate(`/order/${order.id}`);
                        window.location.reload();
                      }}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no__hsitory__content">
              {" "}
              <img src={require(`../img/nomyhistory.png`)}></img>
              <div className="no__history__text__container">
                <div className="title__no__history">
                  Tu historial de compras esta vacío
                </div>
                <div className="txt__no__history">
                  Explora y conoce algunos de nuestros productos y grandes
                  ofertas
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
