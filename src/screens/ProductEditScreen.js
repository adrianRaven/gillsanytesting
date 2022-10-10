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
    case "FETCH_REQUEST_CAT":
      return { ...state, loading: true };
    case "FETCH_SUCCESS_CAT":
      return { ...state, categoriesdata: action.payload.data, loading: false };
    case "FETCH_FAIL_CAT":
      return { ...state, loading: false, error: action.payload.data };
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

export default function ProductEditScreen() {
  const params = useParams(); // /product/:id
  const { id: productId } = params;
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, categoriesdata }, dispatch] =
    useReducer(reducer, {
      categoriesdata: [],
      loading: true,
      error: "",
    });

  const MyComponent = () => (
    <Select
      isMulti="true"
      options={categoriesdata.map((item) => {
        return { label: item.name, value: item.id };
      })}
      closeMenuOnSelect={false}
      onChange={(e) => {
        categories.push(e[e.length - 1]);
        //setCategory([...categories, e[e.lenght - 1]]);
      }}
    />
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState([]);
  const [categories, setCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  console.log(isActive);

  const [imageSelected, setImageSelected] = useState([]);
  const uploadImage = () => {
    Array.from(imageSelected).forEach((item) => {
      const formData = new FormData();

      formData.append("file", item);
      formData.append("upload_preset", "gillsany");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/ds5t2rctu/image/upload",
          formData
        )
        .then((response) => {
          image.push({ uri: response.data.public_id });
        });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST_CAT" });
        const resultCategories = await axios.get(
          "https://gillsanyback.herokuapp.com/api/category"
        );

        dispatch({ type: "FETCH_SUCCESS_CAT", payload: resultCategories.data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL_CAT",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://gillsanyback.herokuapp.com/api/product/${productId}`
        );
        setName(data.data.name);
        setPrice(data.data.price);
        setImage(data.data.images);
        setDiscount(data.data.discount);
        setCategory(
          data.data.categories.map((item) => {
            return { label: item.name, value: item.id };
          })
        );
        setIsActive(data.data.isActive);
        setDescription(data.data.description);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `https://gillsanyback.herokuapp.com/api/product/${productId}`,
        {
          id: productId,
          name,
          price: parseFloat(price),
          images: image,
          isActive: true,
          discount: parseFloat(discount),
          categories: categories.map((item) => {
            return { id: item.value };
          }),
          description,
        },
        {
          headers: { authorization: `Bearer ${userInfo.data.accessToken}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Producto actualizado exitosamente");
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  return (
    <div className="small-container">
      <div>
        <title>Edit Product ${productId}</title>
      </div>
      <h1 className="title-editProd">Editar Producto {productId}</h1>

      {loading ? (
        <div></div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <div className="contenedor-forma-updateProd">
          <div className="forma-updateProd">
            <section className="contenedor-input-images">
              <input
                type="file"
                name="file"
                placeholder="Subir Imagen"
                onChange={(event) => {
                  setImageSelected(event.target.files);
                }}
                className="custom-file-upload"
                multiple
              />
              <button className="boton-uploadto-server" onClick={uploadImage}>
                Subir imagenes
              </button>
            </section>

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
                <div className="titulo-field">Precio</div>
                <div className="field">
                  <input
                    type="number"
                    required
                    className="nav-search-input-signin"
                    maxLength="120"
                    autoFocus
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="titulo-field">Precio Oferta</div>
                <div className="field">
                  <input
                    type="number"
                    required
                    className="nav-search-input-signin"
                    maxLength="120"
                    autoFocus
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
              <div className="titulo-field">Descripción</div>
              <div className="field">
                <input
                  type="text"
                  required
                  className="nav-search-input-signin"
                  maxLength="999"
                  autoFocus
                  autoCapitalize="off"
                  spellCheck="false"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="titulo-field">Categorias</div>
              <div className="dropdown-category">
                <MyComponent></MyComponent>
              </div>
              <div className="dropdown-section">
                <input
                  className="input-checkbox"
                  type="checkbox"
                  onChange={(e) => setIsActive(e.target.value)}
                />{" "}
                <div className="text-checkbox">Producto Activo</div>
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
