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
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const navigate = useNavigate();
  const navRef = useRef();
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    navigate("/");
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/category"
        );
        setCategories(data);
      } catch (err) {
        //toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  function subMenuClick() {
    document.getElementById("subMenu").classList.toggle("show");
  }

  function subMenuClickAdmin() {
    document.getElementById("subMenu_admin").classList.toggle("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("submenu");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("submenu_admin");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div className="navbar-contenedor">
      <a href="/">
        <h3 className="h3-nav">GILLSANY</h3>
      </a>
      <nav className="navbar__nav" ref={navRef}>
        <ul className="navbar__menu__main">
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/productos">Productos</a>
          </li>
          <li>
            <a href="/">Ofertas</a>
          </li>
          <li>
            <a href="/acercade">Nosotros</a>
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
                <button
                  type="button"
                  className="dropbtn"
                  onClick={subMenuClick}
                >
                  {userInfo.data.user.FirstName}&nbsp;
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="arrow-down"
                  />
                </button>
                <ul className="submenu" id="subMenu">
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
          {userInfo && userInfo.data.user.roles[0] === "ADMIN" && (
            <li className="container-submenu-admin">
              {" "}
              {userInfo ? (
                <>
                  {" "}
                  <button
                    type="button"
                    className="dropbtn"
                    onClick={subMenuClickAdmin}
                  >
                    Administrador &nbsp;
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="arrow-down"
                    />
                  </button>
                  <ul className="submenu_admin" id="subMenu_admin">
                    <li>
                      <a href="/admin/Dashboard">Dashboard</a>
                    </li>
                    <li>
                      <a href="/admin/Products">Productos</a>
                    </li>
                    <li>
                      <a href="/admin/Orders">Compras</a>
                    </li>
                    <li>
                      <a href="/admin/categories">Categorias</a>
                    </li>
                  </ul>
                </>
              ) : (
                <a href="/signin">Ingresar</a>
              )}{" "}
            </li>
          )}

          {userInfo && (
            <li>
              <button
                target="/"
                className="dropbtn"
                onClick={() => {
                  signoutHandler();
                  refreshPage();
                }}
              >
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
