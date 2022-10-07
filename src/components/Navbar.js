import React, { useContext, useEffect, useState } from "react";
import "../css/Navbar.css";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faCartShopping,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Store } from "../Store";
import axios from "axios";

function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const navRef = useRef();

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://gillsanyback.herokuapp.com/api/category"
        );
        setCategories(data);
      } catch (err) {
        //toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  console.log(categories);
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const subMenuClick = () => {
    const subMenuBtn = document.querySelectorAll(".dropbtn");
    for (let i = 0; i < 1; i++) {
      subMenuBtn[i].addEventListener("click", function () {
        const subMenu = this.nextElementSibling;
        if (subMenu.classList.contains("desplegar")) {
          subMenu.classList.remove("desplegar");
          subMenu.removeAttribute("style");
        } else {
          subMenu.classList.add("desplegar");
          subMenu.style.height = 5 + "em";
        }
      });
    }
  };

  return (
    <div className="navbar-contenedor">
      <h3 className="h3-nav">GILLSANY</h3>
      <nav ref={navRef}>
        <ul className="navbar__menu__main">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/productos">Prouctos</a>
          </li>
          <li>
            <a href="/">Ofertas</a>
          </li>
          <li>
            <a href="/acercade">Acerca de</a>
          </li>
        </ul>
        <hr className="division__menu" />
        <ul className="navbar__menu__account">
          <li className="li__carrito">
            <a href="/cart">
              <div>
                {" "}
                <FontAwesomeIcon icon={faCartShopping} />
              </div>

              {cart.cartItems.length > 0 && (
                <div bg="danger" className="badgeCarrito">
                  {cart.cartItems.reduce((a, c) => a + c.product.quantity, 0)}
                </div>
              )}
            </a>
          </li>
          <li className="container-submenu">
            {" "}
            {userInfo ? (
              <>
                {" "}
                <button onClick={subMenuClick} className="dropbtn">
                  {userInfo.data.user.FirstName}&nbsp;
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="arrow-down"
                  />
                </button>
                <ul className="submenu">
                  <li>
                    <a href="/profile">Perfil</a>
                  </li>
                  <li>
                    <a href="/orderhistory">Historial</a>
                  </li>
                </ul>
              </>
            ) : (
              <a href="/signin">Ingresar</a>
            )}{" "}
          </li>

          {userInfo && (
            <li>
              <button className="dropbtn" onClick={signoutHandler}>
                Salir
              </button>
            </li>
          )}
        </ul>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        {cart.cartItems.length > 0 && (
          <div bg="danger" className="items-cart-bars">
            {cart.cartItems.reduce((a, c) => a + c.product.quantity, 0)}
          </div>
        )}
      </button>
    </div>
  );
}

export default Navbar;
