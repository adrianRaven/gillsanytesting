import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Store } from "../Store";
import { useParams, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import "../css/ProductScreen.css";
import AccessorieItem from "../components/AccessorieItem";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "react-multi-carousel";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

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
  // ---- temporary cart --------*/
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);

  const parentToChild = () => {
    setData();
  };

  const childToParent = (childData) => {
    setData(childData);
  };

  //----- end temporary cart section --------*/
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1660 },
      items: 4,
    },
    desktopTwo: {
      breakpoint: { max: 1660, min: 1460 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1460, min: 1023 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  const imageRef = useRef(null);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

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

  const addToCartHandler = async () => {
    const finalArray = [
      ...data,
      {
        product: product,
        purchasePrice: product.price,
        quantity: quantity,
      },
    ];
    ctxDispatch({
      type: "CART_ADD_ITEMS",
      payload: finalArray,
    });
    navigate("/cart");
    window.location.reload(false);
  };

  const addToCartCheckoutHandler = async () => {
    const existItem = cart.cartItems.find(
      (x) => x.id === product.id || x.product.id === product.id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/signin?redirect=/shipping");
    window.location.reload(false);
  };

  const showImage = async (pic) => {
    imageRef.current.src = pic;
  };

  const addProduct = async () => {
    setQuantity(quantity + 1);
  };

  const removeProduct = async () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error} </MessageBox>
  ) : (
    <div className="contenedor__product_screen">
      <div className="contenedor__product__main">
        <div className="flex__box">
          <div className="contenedor__product_left">
            <div className="contenedor__big__image">
              <Zoom>
                {product.images.length > 0 ? (
                  <img
                    ref={imageRef}
                    alt={product.name}
                    src={
                      "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                      product.images[0].uri
                    }
                  />
                ) : (
                  <img
                    alt={product.name}
                    className={product.name}
                    src={require(`../img/noimage.png`)}
                  />
                )}
              </Zoom>
            </div>

            <Carousel responsive={responsive} className="carousel__component">
              {product.images.map((p) => (
                <div className="small__images" key={product.id}>
                  <img
                    src={
                      "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                      p.uri
                    }
                    alt={p.name}
                    key={product.id}
                    onClick={() =>
                      showImage(
                        "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                          p.uri
                      )
                    }
                  />
                </div>
              ))}
            </Carousel>

            {product.images.length > 0 ? (
              <Carousel
                responsive={responsive}
                className="carousel__component__mobile"
              >
                {product.images.map((p) => (
                  <div className="small__images" key={product.id}>
                    <Zoom>
                      <img
                        src={
                          "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                          p.uri
                        }
                        alt={p.name}
                        key={product.id}
                        onClick={() =>
                          showImage(
                            "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                              p.uri
                          )
                        }
                      />
                    </Zoom>{" "}
                  </div>
                ))}
              </Carousel>
            ) : (
              <img
                alt={product.name}
                className="noimage__carousel"
                src={require(`../img/noimage.png`)}
              />
            )}
          </div>
        </div>
        <div className="contenedor__product_right">
          {" "}
          <div className="contenedor__product__name">{product.name} </div>
          {product.isActive ? (
            <div className="success">Disponible</div>
          ) : (
            <div className="danger">No Disponible</div>
          )}
          <div className="contenedor__product__precio"> </div>
          {product.discount == 0 ? (
            <div></div>
          ) : (
            <div className="contenedor__product__precio">
              ${" "}
              {parseFloat(product.price, 2).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          )}
          {product.discount > 0 ? (
            <div className="contenedor__product__oferta">
              ${" "}
              {parseFloat(product.discount, 2).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          ) : (
            <div className="contenedor__product__oferta">
              ${" "}
              {parseFloat(product.price, 2).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          )}
          <div>IVA Incluido </div>
          <div className="product__panel__container">
            <div className="product__panel__title">Cantidad</div>
            <div className="accessory-panelAdd">
              <button onClick={removeProduct}>
                <div className="quantityItem-minus">
                  {" "}
                  <FontAwesomeIcon icon={faCircleMinus} />
                </div>
              </button>{" "}
              <div className="accessory__quantityItem">{quantity}</div>
              <button
                className="accessory__button___noDecorations"
                onClick={addProduct}
              >
                <div className="quantityItem-plus">
                  {" "}
                  <FontAwesomeIcon icon={faCirclePlus} />
                </div>
              </button>
            </div>
          </div>
          <div className="contenedor-botones-product">
            <div className="ui-pdp-container-accesorios">
              <h2 className="caracteristicas-title">Accesorios extra</h2>
              <div className="accesorios-contenedor">
                <AccessorieItem
                  parentToChild={data}
                  props={product.accessories}
                  childToParent={childToParent}
                ></AccessorieItem>
              </div>
            </div>
            <button className="boton-compra-one">
              <span onClick={addToCartCheckoutHandler}>Comprar ahora</span>
            </button>
            <button className="boton-compra-two">
              <span onClick={addToCartHandler}>Agregar al carrito</span>
            </button>
          </div>
        </div>{" "}
      </div>

      <div className="info_product_descripcion">
        <div className="info_product_description_title">Categorias </div>
        <div className="info_product_categories">
          {product.categories.map((p) => (
            <div className="categories__item">{p.name}</div>
          ))}
        </div>
      </div>

      <div className="info__product__section">
        <div className="info__product__content_section">
          <div className="info__product__youtube__link">
            <a href={product.video} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <div className="info__product__youtube__txt">
              <a href={product.video} target="_blank">
                Más información
              </a>
            </div>
          </div>
        </div>

        <div className="info_product_descripcion">
          <div className="info_product_description_title">Descripción </div>
          <div className="info_product_descripcion_txt">
            <div>{product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
