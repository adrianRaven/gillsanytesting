import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import "../css/OrderListScreen.css";
import { DataGrid } from "@mui/x-data-grid";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderListScreen() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const rows = orders?.data.map((o) => {
    return {
      id: o.id,
      col1: o.id,
      col2: o.createdAt.substring(0, 10),
      col3: o.totalPrice,
      col4: o.isPaid ? o.paidAt.substring(0, 10) : "No",
      col5: o.isDelivered ? o.deliveredAt.substring(0, 10) : "No",
    };
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/purchase",
          {
            headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <title>Orders</title>
      {loading ? (
        <div>cargando...</div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <div>
          <div>
            <div>
              <h1 className="titulo-lista-ordenes">Compras</h1>
            </div>
          </div>
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div
              className="table-component-orders"
              style={{ height: 800, width: "80%", margin: "0 auto" }}
            >
              <DataGrid
                columns={[
                  { field: "col1", headerName: "ID", flex: 0.1, minWidth: 80 },
                  {
                    field: "col2",
                    headerName: "Fecha",
                    flex: 0.2,
                    minWidth: 80,
                  },
                  {
                    field: "col3",
                    headerName: "Total",
                    flex: 0.1,
                    minWidth: 80,
                  },
                  {
                    field: "col4",
                    headerName: "Pagado",
                    flex: 0.1,
                    minWidth: 80,
                  },
                  {
                    field: "col5",
                    headerName: "Entregado",
                    flex: 0.1,
                    minWidth: 80,
                  },
                  {
                    field: "col6",
                    headerName: "Editar",
                    sortable: false,
                    flex: 0.1,
                    minWidth: 80,
                    renderCell: (params) => {
                      const onClick = (e) => {
                        e.stopPropagation(); // don't select this row after clicking
                        navigate(`/order/${params.id}`);
                      };
                      return (
                        <button
                          type="button"
                          className="button-edit"
                          onClick={onClick}
                        >
                          Edit
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
    </div>
  );
}
