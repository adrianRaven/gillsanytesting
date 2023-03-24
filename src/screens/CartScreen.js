import { useContext, useEffect, useReducer } from "react";
import React from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
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
              <div>
                {" "}
                <p>El carrito de compras esta vacío. </p>
              </div>
              <div className="link__buy__again">
                {" "}
                <a href="/">¡Vuelve a comprar!</a>
              </div>
              <div>
                {" "}
                <img
                  className="empty__cart__img"
                  src={require(`../img/emptycart.png`)}
                ></img>
              </div>
            </div>
          ) : (
            <div className="contenedor__item__carrito">
              {cartItems.map((item) => (
                <div key={item.product.id}>
                  <div className="contenedor-item-detalle-incarrito">
                    <div className="contenedor-section-img-title">
                      {" "}
                      <div className="item-img">
                        <div>
                          <a
                            to={`/product/${item.product.id}`}
                            href={`/product/${item.product.id}`}
                          >
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
                          </a>
                        </div>
                      </div>
                      <div className="item-text-details">
                        <a href={`/product/${item.product.id}`}>
                          {item.product.name}
                        </a>
                      </div>
                    </div>

                    <div className="item-panel-options">
                      <div className="item-panelAdd">
                        <button
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          className="button-noDecorations"
                        >
                          <div className="quantityItem-minus">
                            {" "}
                            <FontAwesomeIcon icon={faCircleMinus} />
                          </div>
                        </button>{" "}
                        <div className="quantityItem">
                          <span>{item.quantity}</span>{" "}
                        </div>
                        <button
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
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
                        {item.product.discount > 0 ? (
                          <div className="">$ {item.product.discount}</div>
                        ) : (
                          <div className="">$ {item.product.price} </div>
                        )}
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
            <div className="precio-envio-total-txt">Total con envío</div>
            <div className="precio-envio-total">
              <span className="precio-envio-info">
                {" "}
                <div>
                  $
                  {cartItems
                    .reduce(
                      (a, c) =>
                        a +
                        (c.product.discount > 0
                          ? c.product.discount
                          : c.product.price) *
                          c.quantity,
                      0
                    )
                    .toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                </div>
              </span>
            </div>
          </div>
          <div className="precio-envio-info-items-quantity">
            ({cartItems.reduce((a, c) => a + c.quantity, 0)} productos)
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
