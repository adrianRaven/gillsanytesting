import React, { useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import Axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils";
import "../css/PlaceOrderScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce(
      (a, c) =>
        a +
        c.product.quantity *
          (c.product.discount > 0 ? c.product.discount : c.product.price),
      0
    )
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await Axios.post(
        process.env.REACT_APP_API_URL_TESTING + "/purchase",
        {
          user: userInfo.data.user,
          products: cart.cartItems,
          shippingAddress:
            cart.shippingAddress.address +
            ", " +
            cart.shippingAddress.city +
            ", " +
            cart.shippingAddress.stateName +
            ", " +
            cart.shippingAddress.country +
            ", " +
            cart.shippingAddress.postalCode,
          paymentMethod: "Paypal",
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.data.accessToken}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.result.id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <div className="contenedor">
      {" "}
      <div className="contenedor-placeorder-detalle">
        <div className="panel-order-left">
          <div className="panel-left-title">
            <div className="panel-title-text">Vista Previa de la Orden</div>
          </div>
          <div className="panel-left-shipping-preview">
            <div className="shipping__title">Información del envío</div>
            <div className="shipping-text">
              <div>
                <strong>Nombre: </strong> {cart.shippingAddress.fullName}
              </div>
              <div>
                {" "}
                <strong>Dirección: </strong> {cart.shippingAddress.address}
                ,&nbsp;
                {cart.shippingAddress.city},&nbsp;
                {cart.shippingAddress.stateName}
                ,&nbsp;
                {cart.shippingAddress.country}, CP.{" "}
                {cart.shippingAddress.postalCode}
              </div>
            </div>
            <a href="shipping">Edit</a>
          </div>

          <div className="panel-left-items">
            <div>
              {cart.cartItems.map((item) => (
                <div
                  className="contenedor__item__preview_order"
                  key={item.product.id}
                >
                  <div className="items-contenedor-left">
                    <img
                      src={
                        "https://res.cloudinary.com/ds5t2rctu/image/upload/v1654998479/" +
                        item.product.images[0].uri
                      }
                      alt={item.product.name}
                    ></img>
                  </div>
                  <div className="items-contenedor-right">
                    <div
                      className="name-item-order-txt"
                      to={`/product/${item.product.slug}`}
                    >
                      {item.product.name}
                    </div>
                    <div className="name-item-order-quantity">
                      Cantidad: <span>{item.product.quantity}</span>
                    </div>
                    <div className="name-item-order-price">
                      ${" "}
                      {item.product.discount > 0
                        ? item.product.discount.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                        : item.product.price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}{" "}
                      <p className="preview__unit_price_label">
                        Precio Unitario
                      </p>
                    </div>
                    <a className="name-item-order-edit" href="/cart">
                      Editar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="panel-order-right">
          <div className="contenedor-card-ordersummary">
            <div className="contenedor-row5">Total</div>
            <div className="contenedor-row5C5">
              <strong>
                $
                {cart.totalPrice.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </strong>
            </div>
          </div>
          <div className="contenedor-boton-pedido">
            {" "}
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
              className="boton-pedido"
            >
              Realizar Pedido
            </button>
            {loading && <div>Cargando...</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
