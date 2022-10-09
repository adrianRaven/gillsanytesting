import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import "../css/ShippingAddressScreen.css";
import { Country, State, City } from "country-state-city";
import { useFormik } from "formik";
import Select from "react-select";

function ShippingAddressScreen() {
  const addressFromik = useFormik({
    initialValues: {
      country: "India",
      state: null,
      city: null,
    },
    onSubmit: (values) => console.log(JSON.stringify(values)),
  });

  const countries = Country.getAllCountries();

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  const updatedStates = (countryId) =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    }));

  const updatedCities = (countryId, stateId) =>
    City.getCitiesOfState(countryId, stateId).map((city) => ({
      label: city.name,
      value: city.stateCode,
      ...city,
    }));
  const { values, setFieldValue, setValues } = addressFromik;

  useEffect(() => {}, [values]);

  /**/
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    console.log(values);
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city: values.city.label,
        state: values.state.label,
        postalCode,
        country: values.country.label,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city: values.city.label,
        state: values.state.label,
        postalCode,
        country: values.country.label,
      })
    );
    navigate("/placeorder");
  };

  return (
    <div>
      <div className="contenedor-principal-shipping">
        <div className="contenedor-detalle-shipping">
          <div className="detalle-shipping-title">
            <div className="shipping-title">Dirección de Envío</div>
          </div>
          <form onSubmit={submitHandler} className="form-shipping-address">
            <input
              type="text"
              value={fullName}
              placeholder="Nombre completo"
              onChange={(e) => setFullName(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />

            <input
              type="text"
              value={address}
              placeholder="Dirección de envío"
              onChange={(e) => setAddress(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />
            <Select
              placeholder="-- Selecciona el País --"
              id="country"
              name="country"
              label="country"
              className="select-form"
              options={updatedCountries}
              value={values.country}
              onChange={(value) => {
                setValues({ country: value, state: null, city: null }, false);
              }}
            />
            <Select
              placeholder="-- Selecciona el Estado --"
              className="select-form"
              id="state"
              name="state"
              options={
                values.country ? updatedStates(values.country.isoCode) : null
              }
              value={values.state}
              onChange={(value) => {
                setValues(
                  { country: values.country, state: value, city: null },
                  false
                );
              }}
            />
            <Select
              placeholder="-- Selecciona la Ciudad --"
              className="select-form"
              id="city"
              name="city"
              options={
                values.state
                  ? updatedCities(
                      values.state.countryCode,
                      values.state.isoCode
                    )
                  : null
              }
              value={values.city}
              onChange={(value) => setFieldValue("city", value)}
            />

            <input
              type="text"
              value={postalCode}
              placeholder="CP"
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="nav-search-input-signin"
              maxLength="120"
              autoFocus
              autoCapitalize="off"
              spellCheck="false"
              autoComplete="off"
            />
            <div className="contenedor-botones-signin">
              <button type="submit" className="boton-continuar-signin">
                <span>Continuar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddressScreen;
