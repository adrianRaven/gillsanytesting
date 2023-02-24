import React from "react";
import "../css/ConfirmationScreen.css";
export default function ConfirmationScreen() {
  return (
    <div className="contenedor__verification__main">
      <div className="contenedor__verification_mail">
        <img
          alt="verification mail"
          src={require(`../img/verificationmail.png`)}
        />
        <div className="titulo__verification__mail">
          Te hemos enviado un correo de verificación <br></br>de cuenta
        </div>
        <div className="text__verification__mail">
          Haz Click en el enlance que enviamos a tu correo para verificar tu
          cuenta. Si no encuentras el correo, revisa en la bandeja de spam.
        </div>
        <div className="text__login__link">
          Después de verificar el correo vuelve a{" "}
          <a href="/signin" className="link__verification__mail">
            Iniciar sesión
          </a>{" "}
        </div>
      </div>
    </div>
  );
}
