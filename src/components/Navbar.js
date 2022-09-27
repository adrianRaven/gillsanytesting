import "../css/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="navbar-contenedor">
      <div className="navbar-top-section">
        <div className="logo__nav">
          <a href="/">
            {" "}
            <img
              src={require("../img/logo_3.png")}
              alt="Gillsany"
              className="logo"
            />
          </a>
        </div>
      </div>
      <div className="navbar-bottom-section">
        <span className="nav-bar" id="btnMenu">
          <FontAwesomeIcon icon={faBars} />
        </span>

        <div className="navbar-meu">
          <ul className="menu" id="menu">
            <li className="menu__item container__submenu">
              <a href="/" className="menu__link submenu-btn">
                Categorias <FontAwesomeIcon icon={faChevronDown} />
              </a>
              <ul className="submenu">
                <li className="menu__item">
                  <a href="/" className="menu__link">
                    Ultrasonidos
                  </a>{" "}
                </li>
                <li className="menu__item">
                  <a href="/" className="menu__link">
                    Electrocauterios
                  </a>{" "}
                </li>
                <li className="menu__item">
                  <a href="/" className="menu__link">
                    Accesorios
                  </a>{" "}
                </li>
              </ul>
            </li>
            <li className="menu__item">
              <a href="/" className="menu__link">
                Ofertas
              </a>
            </li>
            <li className="menu__item">
              <a href="/" className="menu__link">
                Gillsany
              </a>
            </li>
          </ul>

          <div>
            <ul className="menu">
              <li className="menu__item">
                <a href="/" className="menu__link">
                  Carrito
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
