import React from "react";
import "../css/Product.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Product(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1660 },
      items: 5,
    },
    desktopTwo: {
      breakpoint: { max: 1660, min: 1460 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1460, min: 1023 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="product__container__main">
      <Carousel responsive={responsive}>
        {props.products.map((product) => (
          <a
            key={product.id}
            className="tarjeta-producto"
            href={`/product/${product.id}`}
          >
            <div className="contenedor-imagen">
              <div className="tarjeta-link">
                {product.images.length > 0 ? (
                  <img
                    alt={product.name}
                    src={
                      "https://res.cloudinary.com/ds5t2rctu/image/upload/v1659968156/" +
                      product.images[product.images.length - 1].uri
                    }
                  />
                ) : (
                  <img
                    alt={product.name}
                    className={product.name}
                    src={require(`../img/noimage.png`)}
                  />
                )}
              </div>
            </div>
            <div className="contenedor-item-info">
              <div className="item-cantidad">
                {product.discount > 0 ? (
                  <span className="item-cantidad-tag">
                    <span className="item-precio-simbolo">$ </span>
                    <span className="itemprecio-digitos">
                      {parseFloat(product.discount, 2).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 2 }
                      )}
                    </span>
                  </span>
                ) : (
                  <span className="item-cantidad-tag">
                    <span className="item-precio-simbolo">$ </span>
                    <span className="itemprecio-digitos">
                      {parseFloat(product.price, 2).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </span>
                )}

                {product.discount == 0 ? (
                  <div></div>
                ) : (
                  <div className="item-original-price">
                    ${" "}
                    {parseFloat(product.price, 2).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                )}
              </div>
              <div className="producto__info__nombre">
                <p>{product.name}</p>
              </div>
            </div>
          </a>
        ))}
      </Carousel>
    </div>
  );
}

export default Product;
