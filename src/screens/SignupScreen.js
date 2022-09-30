import React from "react";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/SignupScreen.css";

function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post(
        "https://gillsanyback.herokuapp.com/api/user/register",
        {
          FirstName,
          LastName,
          email,
          phoneNumber,
          Password,
          Address,
          PostalCode,
        }
      );
      ctxDispatch({ type: "USER_SIGNUP", payload: data });
      //localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/signin");
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
          <div className="titulo-signin">Tus datos</div>
        </div>
        <form action="" method="GET" role="search" onSubmit={submitHandler}>
          {" "}
          <div className="signin-correo">
            <div className="form-control-signin">
              <input
                type="text"
                required
                className="nav-search-input-signin"
                placeholder="Nombre"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control-signin">
              <input
                type="text"
                required
                className="nav-search-input-signin"
                placeholder="Apellido"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control-signin">
              <input
                type="text"
                required
                className="nav-search-input-signin"
                placeholder="Dirección"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-control-signin">
              <input
                type="text"
                required
                className="nav-search-input-signin"
                placeholder="Código Postal"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>
          <div className="signin-correo">
            <div className="form-control-signin">
              <input
                type="email"
                required
                className="nav-search-input-signin"
                placeholder="Correo electrónico"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control-signin">
            <input
              type="text"
              required
              className="nav-search-input-signin"
              placeholder="Número de Telefono"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="signin-password">
            <div>Contraseña</div>
            <div
              className="form-control-signin"
              placeholder="Contraseña"
              action=""
              method="GET"
              role="search"
            >
              <input
                type="password"
                required
                className="nav-search-input-signin"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="signin-password">
            <div>Confirmar contraseña</div>
            <div
              className="form-control-signin"
              action=""
              method="GET"
              role="search"
            >
              <input
                type="password"
                required
                className="nav-search-input-signin"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="signin-botones">
            <div className="contenedor-botones-signin">
              <button type="submit" className="boton-continuar-signin">
                <span>Crear cuenta</span>
              </button>
            </div>
          </div>
        </form>

        <div className="signup-info">
          <div>¿Ya tienes una cuenta?</div>
          <a
            className="link-login-form signup-link"
            href={`/signin?redirect=${redirect}`}
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
