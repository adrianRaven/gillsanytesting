import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/SigninScreen.css";

function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        "https://gillsanyback.herokuapp.com/api/auth/login",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      alert("Correo invalido o contraseña");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="contenedor-principal-signin">
      <div className="contenedor-detalle-signin">
        <div className="signin-titulo">
          <div className="titulo-signin">Bienvenido a Gillsany</div>
        </div>
        <form
          className="form-login"
          action=""
          method="GET"
          role="search"
          onSubmit={submitHandler}
        >
          {" "}
          <input
            type="email"
            required
            placeholder="correo electrónico"
            className="nav-search-input-signin"
            maxLength="120"
            autoFocus
            autoCapitalize="off"
            spellCheck="false"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="contraseña"
            className="nav-search-input-signin"
            maxLength="120"
            autoFocus
            autoCapitalize="off"
            spellCheck="false"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="signin-botones-signin">
            <button type="submit" className="boton-continuar-signin">
              <span>Continuar</span>
            </button>
          </div>
          <br></br>
          <a href="/signup" className="link-login-form">
            Crear una cuenta
          </a>
          <div>Olvidaste tu contraseña</div>
        </form>
      </div>
    </div>
  );
}

export default SigninScreen;
