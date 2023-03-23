import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Store } from "../Store";
import "../css/ProductListScreen.css";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";

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

  const rows = products?.map((p) => {
    return {
      id: p.id,
      col1: p.id,
      col2: p.name,
      col3: p.price,
      col4: p.categories.map((item) => item.name).join(", "),
    };
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
          process.env.REACT_APP_API_URL_TESTING + "/product",
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
          process.env.REACT_APP_API_URL_TESTING + "/product",
          {
            name: "Nuevo Producto",
            description: "Descripcion",
            categories: [],
            accessories: [],
            price: 0.0,
            discount: 0.0,
            images: [],
            isActive: true,
            video: "",
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

  const deleteHandler = async (productId) => {
    if (window.confirm("¿Quieres eliminar este producto?")) {
      try {
        await axios.delete(
          process.env.REACT_APP_API_URL_TESTING + `/product/${productId}`,
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
    <>
      {" "}
      {loading ? (
        <div>cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <div>
            <div>
              <h1 className="titulo-lista-productos">Administrar Productos</h1>
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
            <div variant="danger">
              <div className="error__container">
                <div className="error_title"> Tu sesión ha expirado</div>
                <div className="error_text">
                  {" "}
                  {error}
                  Cierra sesión y vuelve a iniciar sesión para volver a navegar
                  en nuestro sitio web
                </div>
              </div>
            </div>
          ) : (
            <div
              className="table-component-products"
              style={{ height: 800, width: "80%", margin: "0 auto" }}
            >
              <DataGrid
                columns={[
                  { field: "col1", headerName: "ID", flex: 0.1, minWidth: 80 },
                  {
                    field: "col2",
                    headerName: "Nombre",
                    flex: 0.2,
                    minWidth: 80,
                  },
                  {
                    field: "col3",
                    headerName: "Precio",
                    flex: 0.1,
                    minWidth: 80,
                  },
                  {
                    field: "col4",
                    headerName: "Categoria",
                    flex: 0.2,
                    minWidth: 80,
                  },
                  {
                    field: "col5",
                    headerName: "Editar",
                    sortable: false,
                    flex: 0.1,
                    minWidth: 80,
                    renderCell: (params) => {
                      const onClick = (e) => {
                        e.stopPropagation(); // don't select this row after clicking
                        navigate(`/admin/products/${params.id}`);
                        window.location.reload();
                      };
                      return (
                        <button
                          type="button"
                          className="button-edit"
                          onClick={onClick}
                        >
                          Editar
                        </button>
                      );
                    },
                  },
                  {
                    field: "col6",
                    headerName: "Eliminar",
                    sortable: false,
                    flex: 0.1,
                    minWidth: 80,
                    renderCell: (params) => {
                      const onClick = (e) => {
                        e.stopPropagation(); // don't select this row after clicking
                        deleteHandler(params.id);
                      };
                      return (
                        <button
                          type="button"
                          className="button-delete"
                          onClick={onClick}
                        >
                          Eliminar
                        </button>
                      );
                    },
                  },
                ]}
                rows={rows ? rows : []}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
