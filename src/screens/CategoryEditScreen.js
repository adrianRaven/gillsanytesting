import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import { toast } from "react-toastify";
import Select from "react-select";
import "../css/ProductEditScreen.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function CategoryEditScreen() {
  const params = useParams();
  const { id: categoryId } = params;
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + `/category/${categoryId}`
        );
        setName(data.data.name);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [categoryId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      console.log(categoryId);
      await axios.put(
        process.env.REACT_APP_API_URL_TESTING + `/category/${categoryId}`,
        {
          name: name,
        },
        {
          headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Categoria actualizada exitosamente");
      navigate("/admin/categories");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="small-container">
      <div>
        <title>Editar Categoria ${categoryId}</title>
      </div>
      <h1 className="title-editProd">Editar Categoria: {categoryId}</h1>

      {loading ? (
        <div></div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <div className="contenedor-forma-updateProd">
          <div className="forma-updateProd">
            <form action="" method="GET" role="search" onSubmit={submitHandler}>
              {" "}
              <div className="field">
                <div className="titulo-field">Nombre</div>

                <div className="field">
                  <input
                    type="text"
                    required
                    className="nav-search-input-signin"
                    maxLength="120"
                    autoFocus
                    value={name}
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="field-button padding-bottom--24">
                  <button
                    className="button-updateProd"
                    disabled={loadingUpdate}
                    type="submit"
                  >
                    Actualizar
                  </button>
                  {loadingUpdate && <div>Cargando</div>}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
