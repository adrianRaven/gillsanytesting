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
    <div className="contenedor-signup-base">
      <div className="contenedoor-signup-main">
        <div className="singup-titulo">Registrate</div>
        <div className="contenedor-signup-form">
          <form action="" method="GET" role="search" onSubmit={submitHandler}>
            <div className="signup-form-input">
              <input
                type="text"
                required
                placeholder="Nombre"
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
                className=""
                placeholder="Apellido"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                type="text"
                required
                className=""
                placeholder="Dirección"
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
                className=""
                placeholder="Código Postal"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <input
                type="email"
                required
                className=""
                placeholder="Correo electrónico"
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
                className=""
                placeholder="Número de Telefono"
                maxLength="120"
                autoFocus
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="signup-form-input">
              <div
                className=""
                placeholder="Contraseña"
                action=""
                method="GET"
                role="search"
              >
                <input
                  type="password"
                  required
                  className=""
                  maxLength="120"
                  autoFocus
                  autoCapitalize="off"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="signup-form-input">
              <div className="" action="" method="GET" role="search">
                <input
                  type="password"
                  required
                  className=""
                  maxLength="120"
                  autoFocus
                  autoCapitalize="off"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="Confirmar contraseñas"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="contenedor-btn-signup">
              <button type="submit" className="boton-continuar-signin">
                <span>Crear cuenta</span>
              </button>
            </div>
          </form>
        </div>

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
