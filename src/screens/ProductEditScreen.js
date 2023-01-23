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
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
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
    case "FETCH_REQUEST_PRODUCTOS":
      return { ...state, loading: true };
    case "FETCH_SUCCESS_PRODUCTOS":
      return { ...state, products: action.payload.data, loading: false };
    case "FETCH_FAIL_PRODUCTOS":
      return { ...state, loading: false, error: action.payload.data };
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
  const [
    { loading, error, loadingUpdate, products, categoriesdata },
    dispatch,
  ] = useReducer(reducer, {
    categoriesdata: [],
    products: [],
    loading: true,
    error: "",
  });
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState([]);
  const [categories, setCategory] = useState([]);
  //accesorios
  const [accesories, setAccesories] = useState([]);
  const [description, setDescription] = useState("");

  const [imageSelected, setImageSelected] = useState([]);
  const accesoriesArrayOne = products.filter((p) => p.id !== productId);

  const accesoriesArray = accesoriesArrayOne.filter(
    (p) =>
      p.categories.filter((c) => c.name.toLowerCase() === "accesorios").length >
      0
  );
  const MyComponent = () => (
    <Select
      isMulti="true"
      options={categoriesdata.map((item) => {
        return { label: item.name, value: item.id };
      })}
      closeMenuOnSelect={false}
      onChange={(e) => {
        categories.push(e[e.length - 1]);
      }}
    />
  );

  const MyComponentAcc = () => (
    <Select
      isMulti="true"
      options={accesoriesArray.map((item) => {
        return { label: item.name, value: item.id };
      })}
      closeMenuOnSelect={false}
      onChange={(e) => {
        accesories.push(e[e.length - 1]);
      }}
    />
  );

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
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + `/product/${productId}`
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
        setAccesories(
          data.data.accessories.map((item) => {
            return { label: item.name, value: item.id };
          })
        );

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST_CAT" });
        const resultCategories = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/category"
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
      dispatch({ type: "FETCH_REQUEST_PRODUCTOS" });
      try {
        const result = await axios.get(
          process.env.REACT_APP_API_URL_TESTING + "/product"
        );
        dispatch({ type: "FETCH_SUCCESS_PRODUCTOS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL_PRODUCTOS", payload: err.message });
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        process.env.REACT_APP_API_URL_TESTING + `/product/${productId}`,
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
          accessories: accesories.map((item) => {
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
  console.log(image);
  return (
    <>
      {loading ? (
        <div></div>
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <div className="contenedor__forma__updateProd">
          <div className="product__edit__title">
            Editar Producto {productId}
          </div>

          <section className="product__edit__form__upload">
            <input
              type="file"
              name="file"
              placeholder="Subir Imagen"
              onChange={(event) => {
                setImageSelected(event.target.files);
              }}
              className="custom__file__upload"
              multiple
            />
            {/* <div className="product__edit__images__container">
              {image.map((item) => (
                <div>{item.uri} </div>
              ))}
            </div> */}

            <button className="boton__uploadto__server" onClick={uploadImage}>
              Subir imagenes
            </button>
          </section>
          <div className="product__edit__form">
            <form action="" method="GET" role="search" onSubmit={submitHandler}>
              {" "}
              <div className="field__edit__product">
                <div className="field__edit__product__title">Nombre</div>

                <div className="field__edit__product__input">
                  <input
                    type="text"
                    required
                    className="edit__product__input__txt"
                    maxLength="120"
                    autoFocus
                    value={name}
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field__edit__product__title">Precio</div>
                <div className="field">
                  <input
                    type="number"
                    required
                    className="edit__product__input__txt"
                    maxLength="120"
                    autoFocus
                    autoCapitalize="off"
                    spellCheck="false"
                    autoComplete="off"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="field__edit__product__title">Precio Oferta</div>
                <div className="field">
                  <input
                    type="number"
                    required
                    className="edit__product__input__txt"
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
              <div className="field__edit__product__title">Descripción</div>
              <div className="field">
                <textarea
                  type="text"
                  required
                  className="edit__product__input__desc"
                  maxLength="999"
                  autoFocus
                  autoCapitalize="off"
                  spellCheck="false"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="field__edit__product__title">Categorias</div>
              <div className="dropdown-category">
                <MyComponent></MyComponent>
              </div>
              <div className="field__edit__product__title">Accesorios</div>
              <MyComponentAcc></MyComponentAcc>
              <div className="edit__product__buton__update">
                <button
                  className="button-updateProd"
                  disabled={loadingUpdate}
                  type="submit"
                >
                  Actualizar
                </button>
                {loadingUpdate && <div>Cargando</div>}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
