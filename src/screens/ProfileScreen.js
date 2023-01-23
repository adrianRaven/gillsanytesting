import React, { useContext, useEffect, useReducer, useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import "../css/ProfileScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.put(
        process.env.REACT_APP_API_URL_TESTING + `/user/${2}`,
        {
          FirstName,
          LastName,
          email,
          phoneNumber,
          Password,
          Address,
          PostalCode,
        },
        { headers: { authorization: `Bearer ${userInfo.data.accessToken}` } }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: "FETCH_FAIL",
      });
      alert("Correo invalido o contraseña");
    }
  };

  return (
    <div className="contenedor-principal-profile">
      <div className="contenedor-detalle-profile">
        <div className="panel__left__profile">
          <img alt="userPhoto" src={require(`../img/profilePic.png`)}></img>
          <div className="panel__left__user__name">
            {userInfo.data.user.FirstName} {userInfo.data.user.LastName}
          </div>
          <div> {userInfo.data.user.email}</div>
          <div>Tel: {userInfo.data.user.phoneNumber}</div>
          <div>Dirección: {userInfo.data.user.Address}</div>
        </div>
        <div className="panel__right__profile">
          <div className="profile-titulo">
            <div className="titulo-profile">Actualizar información</div>
          </div>
          <form
            className="form-profile"
            action=""
            method="GET"
            role="search"
            onSubmit={submitHandler}
          >
            {" "}
            <div className="signin-correo">
              <input
                type="text"
                required
                placeholder="Nombre"
                className="nav-search-input-profile"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                required
                placeholder="Apellido"
                className="nav-search-input-profile"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Dirección"
                required
                className="nav-search-input-profile"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
              />

              <input
                type="text"
                required
                placeholder="Código Postal"
                className="nav-search-input-profile"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <input
              type="email"
              required
              placeholder="correo eléctronico"
              className="nav-search-input-profile"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Télefono"
              className="nav-search-input-profile"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Contraseña"
              className="nav-search-input-profile"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Confirmar Contraseña"
              className="nav-search-input-profile"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <div className="signin-botones">
              <div className="contenedor-botones-signin">
                <button type="submit" className="boton-continuar-signin">
                  <span>Actualizar</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
