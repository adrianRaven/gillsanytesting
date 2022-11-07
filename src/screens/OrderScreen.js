import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import "../css/OrderScreen.css";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://gillsanyback.herokuapp.com/api/purchase/${orderId}`,
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate("/signin");
    }
    if (
      !order.data ||
      (order.data && successPay) ||
      successDeliver ||
      (order.data.id && order.data.id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    }
  }, [userInfo, orderId, navigate, successPay, successDeliver, order.data]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `https://gillsanyback.herokuapp.com/api/purchase/${orderId}`,
        {
          user: userInfo.data.user,
          isDelivered: order.data.isDelivered,
          products: [],
          paymentMethod: "Paypal",
          taxPrice: "",
          totalPrice: "",
        },
        {
          headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "DELIVER_FAIL" });
    }
  }
  return loading ? (
    <div>cargando</div>
  ) : error ? (
    <div>ERROR</div>
  ) : (
    <div className="contenedor__order">
      <div className="contenedor-order-detalle">
        <div className="panel-norder-left">
          <div className="panel-left-title">
            <div className="panel-title-text">Orden {orderId}</div>
            <div className="panel-left-shipping">
              <div>Envío</div>
              <strong>Dirección:</strong>
              {order.data.shippingAddress}
              <br></br>
              {order.isDelivered ? (
                <div variant="success">Delivered at {order.deliveredAt}</div>
              ) : (
                <div className="box-status">
                  <strong>No envíado</strong>
                </div>
              )}
            </div>

            <div className="panel-left-payment">
              <div>
                Pago
                <br></br>
                <strong>Metodo: Paypal</strong>
              </div>
            </div>
            <div className="panel-left-items">
              <div>Items</div>
              {order.data.products.map((item) => (
                <div key={item.id}>
                  <div className="align-items-center">
                    <div>{item.product.name}</div>
                    <div>${item.purchasePrice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="panel__order__right">
          <div className="contenedor-card-ordersummary">
            <div className="contenedor-row1">Order Summary</div>
            <div className="contenedor-row2">Items</div>
            <div className="contenedor-row2C2">$ {order.data.totalPrice}</div>

            <div className="contenedor-row5">Total</div>

            <div className="contenedor-row5C5">
              <strong>$ {order.data.totalPrice}</strong>
            </div>
            {!order.data.isPaid && <div>Pendiente</div>}
            {userInfo &&
              userInfo &&
              userInfo.data.user.roles[0] === "ADMIN" &&
              order.data.isPaid &&
              !order.isDelivered && (
                <div>
                  {loadingDeliver && <div>cargando</div>}
                  <div className="d-grid">
                    <button type="button" onClick={deliverOrderHandler}>
                      Deliver Order
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
