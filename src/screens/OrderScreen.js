import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import "../css/OrderScreen.css";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import LoadingBox from "../components/LoadingBox";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCreditCard,
  faFileInvoice,
  faHashtag,
  faLink,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
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
  const currency = "MXN";
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [trackingGuide, setTrackingGuide] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
    successDeliver: false,
  });

  const [{ options, isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          //{ amount: { currency_code: "MXN", value: order.data.totalPrice } },
          {
            amount: {
              currency_code: currency,
              value: order.data.totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          process.env.REACT_APP_API_URL_TESTING + `/purchase/${orderId}/pay`,
          details,

          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + `/purchase/${orderId}`,
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
      successPay ||
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
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            ...options,

            currency: currency,
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [userInfo, orderId, navigate, paypalDispatch, successPay]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        process.env.REACT_APP_API_URL_TESTING + `/purchase/${orderId}/deliver`,
        {
          id: parseInt(orderId),
          trakingGuide: trackingGuide,
          deliveryInfo: deliveryInfo,
        },
        {
          headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("La compra ha sido entregada");
      navigate("/admin/Orders");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "DELIVER_FAIL" });
    }
  };

  const receivedOrderHandler = async (e) => {
    try {
      await axios.put(
        process.env.REACT_APP_API_URL_TESTING + `/purchase/${orderId}/receive`,
        {
          headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
        }
      );
      toast.success("La compra se ha recibido");
      navigate("/admin/Orders");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return loading ? (
    <div>cargando</div>
  ) : error ? (
    <div className="error__container">
      <div className="error_title"> Tu sesión ha expirado</div>
      <div className="error_text">
        {" "}
        Cierra sesión y vuelve a iniciar sesión para volver a navegar en nuestro
        sitio web
      </div>
    </div>
  ) : (
    <div className="contenedor__order">
      <div className="contenedor-order-detalle">
        <div className="panel-order-left">
          <div className="panel-left-section">
            {order.data.isDelivered ? (
              <div className="panel-left-title-txt">Detalles de la Compra</div>
            ) : (
              <div className="panel-left-title-txt">Ya casi es tuyo...</div>
            )}

            <div className="panel-title-text">Número de compra: {orderId}</div>
            <div className="panel-left-shipping">
              <div className="panel-left-shipping-title">
                Dirección del envío
              </div>
              <div className="panel-left-shipping-card">
                {" "}
                <div className="shipping-name-title">
                  {order.data.user.FirstName} {order.data.user.LastName}
                </div>
                <div className="shipping-address-card-txt">
                  {" "}
                  {order.data.shippingAddress}
                </div>
              </div>
            </div>

            <div className="panel-left-items">
              <div className="panel-left-shipping-title">Resumén de Compra</div>
              {order.data.products.map((item) => (
                <div className="product-container-item" key={item.id}>
                  <div className="align-items-center">
                    <div className="product-image-item">
                      {item.product.images.length > 0 ? (
                        <img
                          alt={item.product.name}
                          src={
                            "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                            item.product.images[0].uri
                          }
                        />
                      ) : (
                        <img
                          alt={item.product.name}
                          className={item.product.name}
                          src={require(`../img/noimage.png`)}
                        />
                      )}
                    </div>
                    <div className="product-txt-item">
                      <div className="product-txt-name">
                        {item.product.name}
                      </div>
                      <div className="product-txt-currency">Mondea: MXN </div>
                      <div className="product-txt-price">
                        {item.product.discount > 0 ? (
                          <>
                            {" "}
                            <div className="product-txt-price">
                              $
                              {parseFloat(
                                item.product.discount,
                                2
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </div>
                            <div className="product-price-discount">
                              $
                              {parseFloat(item.purchasePrice, 2).toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="product-txt-price">
                            ${" "}
                            {parseFloat(item.purchasePrice, 2).toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="status__oder_section">
              <div className="panel-left-shipping-title">
                Estado de la Compra
              </div>{" "}
              {order.data.isReceived ? (
                <>
                  <div className="label__compra__recibida">
                    Entregado el{" "}
                    <div className="label__compra__date">
                      {Moment(order.data.receivedAt).format("l")}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {order.data.isDelivered ? (
                    <div className="status__success">
                      <FontAwesomeIcon icon={faTruck} />{" "}
                      <div className="status__success__txt">Enviado el:</div>
                      <div className="status__success__green">
                        {Moment(order.data.deliveredAt).format("l")}
                      </div>
                    </div>
                  ) : (
                    <div className="status__success">
                      Estado del envío:{" "}
                      <strong className="status__envio__txt">Pendiente</strong>{" "}
                    </div>
                  )}
                  {order.data.isPaid ? (
                    <div className="status__success">
                      <FontAwesomeIcon icon={faCreditCard} />{" "}
                      <div className="status__success__txt">Pagado el:</div>
                      <div className="status__success__green">
                        {Moment(order.data.paidAt).format("l")}
                      </div>
                    </div>
                  ) : (
                    <div className="status__success">
                      Estado del pago:{" "}
                      <strong className="status__envio__txt">
                        Pago Pendiente
                      </strong>{" "}
                    </div>
                  )}
                  {order.data.isDelivered ? (
                    <>
                      {" "}
                      <div className="status__success">
                        <FontAwesomeIcon icon={faHashtag} />{" "}
                        <div className="status__success__txt">
                          Número de Rastreo:
                        </div>
                        <div className="status__success__green">
                          {order.data.trakingGuide}
                        </div>
                      </div>
                      <div className="status__success">
                        <FontAwesomeIcon icon={faLink} />{" "}
                        <div className="status__success__txt">Enlace:</div>
                        <div className="status__success__green">
                          <a
                            href={"https://" + order.data.deliveryInfo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Rastrea tu envio aqui{" "}
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>

            {!order.data.isPaid && (
              <div>
                {isPending ? (
                  <LoadingBox>Cargando</LoadingBox>
                ) : (
                  <PayPalButtons
                    forceReRender={[currency]}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                )}
                {loadingPay && <LoadingBox>Cargando</LoadingBox>}
              </div>
            )}
          </div>
        </div>
        <div className="panel__order__right">
          <div className="contenedor-card-ordersummary">
            <div className="contenedor-row1">Resumén de Compra</div>
            <div className="contenedor-row-products-price">
              <div className="contenedor-row2">Productos</div>
              <div className="contenedor-row2C2">
                $
                {parseFloat(order.data.totalPrice, 2).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </div>
            </div>
            <div className="contenedor-row-products-total">
              <div className="contenedor-row2">Total</div>
              <div className="contenedor-row2C2">
                ${" "}
                {parseFloat(order.data.totalPrice, 2).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </div>
            </div>

            {userInfo && userInfo && userInfo.data.user.roles[0] === "ADMIN" ? (
              <>
                {" "}
                <div className="admin__panel__order">
                  <div className="deliver__section__admin">
                    <div className="admin__panel__order__title">
                      Panel de Administrador:
                    </div>

                    {userInfo &&
                    userInfo &&
                    userInfo.data.user.roles[0] === "ADMIN" &&
                    order.data.isPaid ? (
                      !order.data.isDelivered ? (
                        <>
                          {loadingDeliver && <LoadingBox>Cargando</LoadingBox>}
                          <form
                            action=""
                            method="GET"
                            role="search"
                            onSubmit={submitHandler}
                          >
                            <div className="deliver__section__admin__laebl">
                              Número de Rastreo
                            </div>
                            <div className="deliver__section__admin__input">
                              <input
                                type="text"
                                className="admin__input"
                                maxLength="120"
                                autoFocus
                                value={trackingGuide}
                                autoCapitalize="off"
                                spellCheck="false"
                                autoComplete="off"
                                onChange={(e) =>
                                  setTrackingGuide(e.target.value)
                                }
                              />
                            </div>
                            <div className="deliver__section__admin__label">
                              Información adicional
                            </div>
                            <div className="deliver__section__admin__input">
                              <input
                                type="text"
                                required
                                className="admin__input"
                                maxLength="120"
                                autoFocus
                                value={deliveryInfo}
                                autoCapitalize="off"
                                spellCheck="false"
                                autoComplete="off"
                                onChange={(e) =>
                                  setDeliveryInfo(e.target.value)
                                }
                              />
                            </div>
                            <div className="signin-botones-signin">
                              <button
                                type="submit"
                                className="boton-continuar-signin"
                              >
                                <span>Envíar Orden</span>
                              </button>
                            </div>
                          </form>
                        </>
                      ) : !order.data.isReceived ? (
                        <>
                          <div className="txt__confirmar__recepcion">
                            Confirmar recepción
                          </div>
                          <button
                            onClick={receivedOrderHandler}
                            className="boton__confirmar__recepcion"
                          >
                            Confirmar
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="contenedor__mensaje__recibido">
                            <div className="icon__check__recibido">
                              <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="txt__recibido">
                              {" "}
                              Compra recibida
                            </div>
                          </div>
                        </>
                      )
                    ) : (
                      <div>
                        {!order.data.isPaid && (
                          <div className="admin__panel__order__status">
                            <FontAwesomeIcon icon={faFileInvoice} /> Pago
                            Pendiente
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
