import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import "../css/ShippingAddressScreen.css";

function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  const handleClick = (e) => {
    e.preventDefault();
    const selected = document.querySelector(".selected");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
      optionsContainer.classList.toggle("active");
    });
    optionsList.forEach((o) => {
      o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
      });
    });
  };

  return (
    <div>
      <div className="contenedor-principal-shipping">
        <div className="contenedor-detalle-shipping">
          <div className="detalle-shipping-title">
            <div className="shipping-title">Dirección de Envío</div>
          </div>
          <form onSubmit={submitHandler} className="form-shipping-address">
            <input
              type="text"
              value={fullName}
              placeholder="Nombre completo"
              onChange={(e) => setFullName(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />

            <input
              type="text"
              value={address}
              placeholder="Dirección de envío"
              onChange={(e) => setAddress(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />

            <div className="form-shipping-text-name">Ciudad</div>
            <div className="select-box">
              <div className="options-container">
                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="coahuila"
                    name="category"
                  ></input>

                  <label for="coahuila">Coahuila</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="nuevoLeon"
                    name="category"
                  ></input>
                  <label for="nuevoLeon">Nuevo León</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="guadalajara"
                    name="category"
                  ></input>
                  <label for="guadalajara">Guadalajara</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="veracruz"
                    name="category"
                  ></input>
                  <label for="veracruz">Veracruz</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="chihuahua"
                    name="category"
                  ></input>
                  <label for="chihuahua">Chihuahua</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="cdmx"
                    name="category"
                  ></input>
                  <label for="cdmx">CDMX</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="zacatecas"
                    name="category"
                  ></input>
                  <label for="zacatecas">Zacatecas</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="sanLuis"
                    name="category"
                  ></input>
                  <label for="sanLuis">San Luis Potosi</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="oaxaca"
                    name="category"
                  ></input>
                  <label for="oaxaca">Oaxaca</label>
                </div>

                <div className="option">
                  <input
                    type="radio"
                    className="radio"
                    id="sonora"
                    name="category"
                  ></input>
                  <label for="sonora">Sonora</label>
                </div>
              </div>
              <div
                className="selected"
                onClick={handleClick}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                Ciudad
              </div>
            </div>

            <input
              type="text"
              value={postalCode}
              placeholder="CP"
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />

            <input
              type="text"
              placeholder="País"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />

            <div className="contenedor-botones-signin">
              <button type="submit" className="boton-continuar-signin">
                <span>Continuar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddressScreen;
