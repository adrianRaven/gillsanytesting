import React from "react";
import "../css/Product.css";
function Product(props) {
  return (
    <>
      {props.products.map((product) => (
        <a
          key={product.id}
          className="tarjeta-producto"
          href={`/product/${product.id}`}
        >
          <div className="contenedor-imagen">
            <div className="tarjeta-link">
              <img
                alt={product.name}
                src={
                  "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                  product.images[0].uri
                }
              />
            </div>
          </div>
          <div className="contenedor-item-info">
            <div className="item-cantidad">
              <span className="item-cantidad-tag">
                <span className="item-precio-simbolo">$ </span>
                <span className="itemprecio-digitos">{product.price} </span>
              </span>
            </div>
            <div className="producto__info__nombre">
              <p>{product.name}</p>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}

export default Product;
