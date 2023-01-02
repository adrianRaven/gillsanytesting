import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { useParams, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import "../css/ProductScreen.css";
import {
  faTrashCan,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + `/product/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL_TESTING + `/product/${product.id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  const addToCartCheckoutHandler = async () => {
    const existItem = cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(
      process.env.REACT_APP_API_URL_TESTING + `/product/${product.id}`
    );
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/signin?redirect=/shipping");
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error} </MessageBox>
  ) : (
    <div className="contenedor__product_screen">
      <div className="contenedor__product__name">{product.name} </div>
      {product.isActive ? (
        <div className="success">Disponible</div>
      ) : (
        <div className="danger">No Disponible</div>
      )}
      <div className="contenedor__prodict__image">
        <img
          className="img"
          src={
            "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
            product.images[0].uri
          }
          alt={product.name}
        />
      </div>
      <div className="contenedor__product__precio">$ {product.price} </div>
      <div className="contenedor__product__oferta">$ {product.discount} </div>
      <div>IVA Incluido </div>

      <div className="contenedor-botones">
        <button className="boton-compra-one">
          <span onClick={addToCartCheckoutHandler}>Comprar ahora</span>
        </button>
        <button className="boton-compra-two">
          <span onClick={addToCartHandler}>Agregar al carrito</span>
        </button>

        <div className="ui-pdp-container-accesorios">
          <h2 className="caracteristicas-title">Accesorios extra</h2>
          <div className="accesorios-contenedor">
            <div className="accesorios-item">
              <div className="img-accesorio">
                <img
                  src={require("../img/accesorio1.png")}
                  alt="Caracteristica 1"
                  width="45px"
                ></img>
              </div>
              <div className="txt-accesorio">Transductor Rectal</div>
              <div className="total-accesorio"> $ 100.00</div>
              <div className="panel-accesorio">
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-minus">
                    {" "}
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </div>
                </button>{" "}
                <div className="quantityItemAccesorio">
                  <span>0</span>{" "}
                </div>
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-plus">
                    {" "}
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </button>
              </div>
            </div>

            <div className="accesorios-item">
              <div className="img-accesorio">
                <img
                  src={require("../img/accesorio2.png")}
                  alt="Caracteristica 2"
                  width="45px"
                ></img>
              </div>
              <div className="txt-accesorio">Transductor Convexo</div>
              <div className="total-accesorio"> $ 100.00</div>
              <div className="panel-accesorio">
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-minus">
                    {" "}
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </div>
                </button>{" "}
                <div className="quantityItemAccesorio">
                  <span>0</span>{" "}
                </div>
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-plus">
                    {" "}
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </button>
              </div>
            </div>

            <div className="accesorios-item">
              <div className="img-accesorio">
                <img
                  src={require("../img/accesorio3.png")}
                  alt="Caracteristica 3"
                  width="45px"
                ></img>
              </div>
              <div className="txt-accesorio">Transductor micorconvexo</div>
              <div className="total-accesorio"> $ 100.00</div>
              <div className="panel-accesorio">
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-minus">
                    {" "}
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </div>
                </button>{" "}
                <div className="quantityItemAccesorio">
                  <span>0</span>{" "}
                </div>
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-plus">
                    {" "}
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </button>
              </div>
            </div>

            <div className="accesorios-item">
              <div className="img-accesorio">
                <img
                  src={require("../img/accesorio4.png")}
                  alt="Caracteristica 3"
                  width="45px"
                ></img>
              </div>
              <div className="txt-accesorio">Protector de pantalla</div>
              <div className="total-accesorio"> $ 100.00</div>
              <div className="panel-accesorio">
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-minus">
                    {" "}
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </div>
                </button>{" "}
                <div className="quantityItemAccesorio">
                  <span>0</span>{" "}
                </div>
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-plus">
                    {" "}
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </button>
              </div>
            </div>

            <div className="accesorios-item">
              <div className="img-accesorio">
                <img
                  src={require("../img/accesorio5.png")}
                  alt="Caracteristica 3"
                  width="45px"
                ></img>
              </div>
              <div className="txt-accesorio">Pila</div>
              <div className="total-accesorio"> $ 100.00</div>
              <div className="panel-accesorio">
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-minus">
                    {" "}
                    <FontAwesomeIcon icon={faCircleMinus} />
                  </div>
                </button>{" "}
                <div className="quantityItemAccesorio">
                  <span>0</span>{" "}
                </div>
                <button className="button-noDecorations">
                  <div className="quantity-accesorio-plus">
                    {" "}
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="info__product__section">
          <div className="info_product_descripcion">
            <div className="info_product_description_title">Descripción </div>
            <div className="info_product_descripcion_txt">
              <div>{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
