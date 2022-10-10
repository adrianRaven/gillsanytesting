import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Store } from "../Store";
import "../css/ProductListScreen.css";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.data,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    { loading, error, products, loadingCreate, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://gillsanyback.herokuapp.com/api/product",
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Quieres crear un nuevo Producto?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "https://gillsanyback.herokuapp.com/api/product",
          {
            name: "Nuevo Producto",
            description: "Descripcion",
            categories: [],
            price: 0.0,
            discount: 0.0,
            images: [],
            isActive: true,
          },
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        toast.success("product created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/products/${data.result.id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `https://gillsanyback.herokuapp.com/api/product/${product.id}`,
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        toast.success("product deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  return (
    <div>
      <div>
        <div>
          <h1 className="titulo-lista-productos">Products</h1>
        </div>
        <div className="col text-end">
          <div className="contenedor-botones-crear">
            <button
              className="button-createProd"
              type="button"
              onClick={createHandler}
            >
              Crear Producto
            </button>
          </div>
        </div>
      </div>

      {loadingCreate && <div>Loading</div>}
      {loadingDelete && <div>Loading</div>}

      {loading ? (
        <div></div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <div>
          <div className="contenedor-tabla-lista-productos">
            <div className="tabla-productos">
              {" "}
              <div className="tabla-row-id header-tabla">ID</div>
              <div className="tabla-row-name header-tabla">Nombre</div>
              <div className="tabla-row-price header-tabla">Precio</div>
              <div className="tabla-row-category header-tabla">Categoria</div>
              <div className="tabla-row-edit header-tabla">Editar</div>
              <div className="tabla-row-delete header-tabla">Eliminar</div>
              {products.map((product) => (
                <>
                  <div className="tabla-row-id">{product.id}</div>
                  <div className="tabla-row-name">{product.name}</div>
                  <div className="tabla-row-price">{product.price}</div>
                  <div className="tabla-row-category">
                    {product.categories.map((item) => item.name).join(", ")}
                  </div>

                  <div className="tabla-row-edit">
                    {" "}
                    <button
                      type="button"
                      className="button-edit"
                      onClick={() => navigate(`/admin/products/${product.id}`)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="tabla-row-delete">
                    <button
                      type="button"
                      className="button-delete"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
