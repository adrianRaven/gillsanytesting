import "../css/HomeScreen.css";
//import Product from "../components/Product";
//import { useEffect, useReducer } from "react";
//import axios from "axios";
//import logger from "use-reducer-logger";
//import LoadingBox from "../components/LoadingBox";
//import MessageBox from "../components/MessageBox";
//import Slider from "../components/slider/Slider";
/*const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload.data, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload.data };
    default:
      return state;
  }
};*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
function HomeScreen() {
  /*const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/product"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);*/

  return (
    <main className="main">
      <div className="home">
        <div className="container">
          <img
            src={require("../img/logowhite.png")}
            alt=""
            className="logo"
          ></img>
          <div className="content">
            <p className="txtMsg">El sitio web esta bajo mantenimiento</p>
            <h1>
              {" "}
              Próximo <span>Lanzamiento</span>
            </h1>
            <p className="txtCustom">30 de Diciembre</p>
            <div className="launch-time">
              <div>
                <p id="days">00</p>
                <span>Días</span>
              </div>

              <div>
                <p id="hours">00</p>
                <span>Horas</span>
              </div>

              <div>
                <p id="minutes">00</p>
                <span>Minutos</span>
              </div>

              <div>
                <p id="seconds">00</p>
                <span>Segundos</span>
              </div>
            </div>
            <button type="button" className="btn__launch">
              Conoce más
            </button>
          </div>
        </div>
        <div className="footer-contenedor">
          <div>GILLSANY</div>{" "}
          <div className="footer-section-social">
            <div className="icons-socialMedia">
              <div className="facebook-icon">
                <a
                  href="https://www.facebook.com/gillsany.mx"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebookF} />{" "}
                </a>
              </div>
              <div className="twitter-icon">
                <a
                  href="https://twitter.com/gillsany"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <div className="instagram-icon">
                <a
                  href="https://www.instagram.com/gillsany.mx/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
              <div className="youtube-icon">
                <a
                  href="https://www.youtube.com/channel/UCTJu8pudB5MTKE1Nx9GJRxg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
              <div className="tiktok-icon">
                <a
                  href="https://www.tiktok.com/@gillsany"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
              </div>
            </div>
            <div className="icons-legend">
              <div className="text-legend">
                Copyright Todos los derechos reservados
              </div>
            </div>
          </div>
        </div>
        {/*<Slider></Slider>
        <div>
          <h1>
            ESTAMOS TRABAJANDO EN EL SITIO - PROXIMAMENTE INAUGURACION DEL SITIO
            WEB
          </h1>
        </div>
        <div className="ofertas-contenedor">
          <div className="contenedor-producto">
            <div className="title-section">Ofertas</div>
            <div>
              {" "}
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error} </MessageBox>
              ) : (
                <div className="flex__container">
                  <Product products={products.slice(0, 4)} />
                </div>
              )}{" "}
            </div>
          </div>

              <div className="contenedor-producto"></div>
        </div>*/}
      </div>
    </main>
  );
}

export default HomeScreen;
