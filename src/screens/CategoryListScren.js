import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/CategoryListScreen.css";
import { DataGrid } from "@mui/x-data-grid";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        categories: action.payload.data,
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
export default function CategoryEditScren() {
  const [
    { loading, error, categories, loadingCreate, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const rows = categories?.map((p) => {
    return {
      id: p.id,
      col1: p.id,
      col2: p.name,
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
          process.env.REACT_APP_API_URL_TESTING + "/category",
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
    if (window.confirm("¿Quieres crear una nueva categoria?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          process.env.REACT_APP_API_URL_TESTING + "/category",
          {
            name: "Nueva Categoria",
          },
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        toast.success("Categoria creada correctamente");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/categories/${data.result.id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (category) => {
    if (window.confirm("Sguro que quieres eliminarla?")) {
      try {
        await axios.delete(
          process.env.REACT_APP_API_URL_TESTING + `/category/${category}`,
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );

        toast.success("Categoria eliminada correctamente");
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
    <div className="categoy__list__container">
      <div>
        <div>
          <h1 className="titulo-lista-productos">Categorias</h1>
        </div>
        <div className="col text-end">
          <div className="contenedor__create__category">
            <button
              className="button__create__category"
              type="button"
              onClick={createHandler}
            >
              Crear Nueva
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
        <div
          className="table-component-products"
          style={{ height: 800, width: "80%", margin: "0 auto" }}
        >
          <DataGrid
            columns={[
              { field: "col1", headerName: "ID", flex: 0.1, minWidth: 80 },
              { field: "col2", headerName: "Nombre", flex: 0.2, minWidth: 80 },
              {
                field: "col3",
                headerName: "Editar",
                sortable: false,
                flex: 0.1,
                minWidth: 80,
                renderCell: (params) => {
                  const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    navigate(`/admin/categories/${params.id}`);
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
                field: "col4",
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
                      className="button-edit"
                      onClick={onClick}
                    >
                      Delete
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
  );
}
