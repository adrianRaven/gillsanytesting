import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { useParams, useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import "../css/ProductScreen.css";

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
      </div>
    </div>
  );
}

export default ProductScreen;
