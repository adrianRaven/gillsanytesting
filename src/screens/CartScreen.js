import { useContext } from "react";
import React from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/CartScreen.css";

import {
  faTrashCan,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL_TESTING + `/product/${item.product.id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="contenedor_cart_main">
      <div className="section_cart_items">
        <div className="section-title-carrito">Carrito de Compras</div>
        <div className="section-items-carrito">
          {cartItems.length === 0 ? (
            <div className="text-alert-noItems">
              <p>El carrito de compras esta vacío. </p> <br></br>
              <a href="/">Vuelve a comprar!</a>
            </div>
          ) : (
            <div className="contenedor__item__carrito">
              {cartItems.map((item) => (
                <div key={item.product.id}>
                  <div className="contenedor-item-detalle-incarrito">
                    <div className="item-img">
                      <div>
                        <a to={`/product/${item.product.slug}`} href="/">
                          <img
                            src={
                              "https://res.cloudinary.com/ds5t2rctu/image/upload/v1654998479/" +
                              item.product.images[0].uri
                            }
                            alt={item.product.name}
                            className="img-incarrito"
                          ></img>{" "}
                        </a>
                      </div>
                    </div>
                    <div className="item-text-details">
                      <a href={`/product/${item.product.id}`}>
                        {item.product.name}
                      </a>
                    </div>

                    <div className="item-panel-options">
                      <div className="item-panelAdd">
                        <button
                          disabled={item.product.quantity === 1}
                          onClick={() =>
                            updateCartHandler(item, item.product.quantity - 1)
                          }
                          className="button-noDecorations"
                        >
                          <div className="quantityItem-minus">
                            {" "}
                            <FontAwesomeIcon icon={faCircleMinus} />
                          </div>
                        </button>{" "}
                        <div className="quantityItem">
                          <span>{item.product.quantity}</span>{" "}
                        </div>
                        <button
                          onClick={() =>
                            updateCartHandler(item, item.product.quantity + 1)
                          }
                          disabled={item.product.quantity === 5}
                          className="button-noDecorations"
                        >
                          <div className="quantityItem-plus">
                            {" "}
                            <FontAwesomeIcon icon={faCirclePlus} />
                          </div>
                        </button>
                      </div>
                      <div className="item-delete">
                        <div>
                          <button
                            onClick={() => removeItemHandler(item)}
                            className="button-noDecorations"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </div>
                      <div className="item-priceTotal">
                        ${item.product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}{" "}
        </div>
      </div>
      <div className="section-total-carrito">
        <div className="contenedor-total-carrito">
          <div className="texto-envio-total">
            <p>Total con envío</p>
            <div className="precio-envio-total">
              <span className="precio-envio-info">
                {" "}
                <div>
                  $
                  {cartItems.reduce(
                    (a, c) => a + c.product.price * c.product.quantity,
                    0
                  )}
                </div>
              </span>
            </div>
          </div>
          <div className="precio-envio-info-items-quantity">
            ({cartItems.reduce((a, c) => a + c.product.quantity, 0)} productos)
          </div>
          <div className="contenedor-botones-cart">
            {cartItems.length > 0 && (
              <button
                onClick={checkoutHandler}
                className="boton-compra-one-cart"
              >
                <span>Continuar compra</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
