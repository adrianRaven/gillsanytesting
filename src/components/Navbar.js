import "../css/Navbar.css";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className="navbar-contenedor">
      <h3 className="h3-nav">GILLSANY</h3>
      <nav ref={navRef}>
        <a href="/">Inicio</a>
        <a href="/">Productos</a>
        <a href="/">Ofertas</a>
        <a href="/">Acerca de</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>
    </div>
  );
}

export default Navbar;
