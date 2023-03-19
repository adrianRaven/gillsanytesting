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
  const redirect = redirectInUrl ? redirectInUrl : "/confirmation";

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
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const { data } = await Axios.post(
        process.env.REACT_APP_API_URL_TESTING + "/user/register",
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

  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <div className="contenedor-signup-base">
      <div className="contenedoor-signup-main">
        <div className="singup-titulo">Registrate</div>
        <div className="contenedor-signup-form">
          <form action="" method="GET" role="search" onSubmit={submitHandler}>
            <div className="signup-form-input">
              <input
                className="input__name"
                type="text"
                required
                placeholder="Nombre"
                maxLength="40"
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleFocus}
                focused={focused.toString()}
                pattern="^[a-zA-Z\s]*$"
              />
              <span className="error__name">
                El nombre debe incluir solamente letras y espacios.
              </span>
              <input
                className="input__last__name"
                type="text"
                required
                placeholder="Apellido"
                maxLength="40"
                focused={focused.toString()}
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                onBlur={handleFocus}
                pattern="^[a-zA-Z\s]*$"
              />
              <span className="error__last__name">
                El Apellido debe incluir solamente letras y espacios.
              </span>
              <input
                type="text"
                required
                className=""
                placeholder="Dirección"
                maxLength="120"
                focused={focused.toString()}
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
                onBlur={handleFocus}
              />

              <input
                type="text"
                required
                className="input__postal__code"
                placeholder="Código Postal"
                maxLength="6"
                focused={focused.toString()}
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                pattern="^\d+$"
                onChange={(e) => setPostalCode(e.target.value)}
                onBlur={handleFocus}
              />
              <span className="error__postal__code">
                El código postal solo debe incluir números.
              </span>
              <input
                type="email"
                required
                placeholder="Correo electrónico"
                maxLength="120"
                focused={focused.toString()}
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleFocus}
              />

              <input
                type="text"
                className="input__phone"
                placeholder="Número de Telefono"
                required
                maxLength="10"
                focused={focused.toString()}
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                pattern="^\d+$"
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={handleFocus}
              />
              <span className="error__phone">
                El número de telefono debe incluir el formato correcto.
              </span>
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
                  id="message"
                  name="message"
                  className="input__pass__one"
                  maxLength="20"
                  focused={focused.toString()}
                  autoCapitalize="off"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleChange(e);
                  }}
                  onBlur={handleFocus}
                  pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}"
                />
                <span className="error__pass__one">
                  La contraseña debe incluir el formato y longitud correcta (Al
                  menos una mayúscula, un número y un caractér especial y al
                  menos 8 caracteres de longitud).
                </span>
              </div>
            </div>
            <div className="signup-form-input">
              <div className="" action="" method="GET" role="search">
                <input
                  type="password"
                  required
                  className="input__pass__two"
                  maxLength="20"
                  autoCapitalize="off"
                  spellCheck="false"
                  autoComplete="off"
                  placeholder="Confirmar contraseñas"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  pattern={message}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <span className="error__pass__two">
                  Las contraseñas deben coincidir
                </span>
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
