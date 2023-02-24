import React from "react";
import "../css/AccessorieItem.css";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AccessorieItem({
  parentToChild,
  props,
  childToParent,
}) {
  const addAccessory = async (id) => {
    const product = props.find((p) => p.id == id);
    const existItem = parentToChild.find(
      (item) => item.product.id === product.id
    );
    parentToChild = existItem
      ? parentToChild.map((item) =>
          item.product.id === existItem.product.id
            ? {
                product: {
                  ...existItem.product,
                },
                purchasePrice: item.purchasePrice,
                quantity: item.quantity + 1,
              }
            : item
        )
      : [
          ...parentToChild,
          {
            product: product,
            purchasePrice: product.price,
            quantity: 1,
          },
        ];

    childToParent(parentToChild);
  };

  const removeAccessory = async (id) => {
    const existItem = parentToChild.find((item) => item.product.id === id);
    if (existItem?.quantity == 1) {
      parentToChild = parentToChild.filter(
        (item) => item.product.id != existItem.product.id
      );
    } else {
      parentToChild = parentToChild.map((item) =>
        item.product.id === id
          ? {
              product: {
                ...item.product,
              },
              purchasePrice: item.purchasePrice,
              quantity: item.quantity - 1,
            }
          : item
      );
    }

    childToParent(parentToChild);
  };

  return (
    <div>
      {" "}
      {props?.map((p) => (
        <div key={p.id} className="itemAccessory__container">
          <div className="accessory__img__container">
            {p.images.length > 0 ? (
              <img
                alt={p.name}
                className="img__accessory"
                src={
                  "https://res.cloudinary.com/ds5t2rctu/image/upload/v1654998479/" +
                  p.images[0].uri
                }
              />
            ) : (
              <img
                alt={p.name}
                className="img__accessory"
                src={require(`../img/noimage.png`)}
              />
            )}
          </div>
          <div className="accessory__name__container">{p.name}</div>
          <div className="accessory__price__container">
            {p.discount > 0 ? (
              <div>$ {p.discount}</div>
            ) : (
              <div>$ {p.price} </div>
            )}
          </div>
          <div className="accessory__panel__container">
            {" "}
            <div className="accessory-panelAdd">
              <button onClick={() => removeAccessory(p.id)}>
                <div className="quantityItem-minus">
                  <FontAwesomeIcon icon={faCircleMinus} />
                </div>
              </button>{" "}
              <div className="accessory__quantityItem">
                {parentToChild.find((item) => item.product.id == p.id)
                  ? parentToChild.find((item) => item.product.id == p.id)
                      .quantity
                  : 0}{" "}
              </div>
              <button
                className="accessory__button___noDecorations"
                onClick={() => addAccessory(p.id)}
              >
                <div className="quantityItem-plus">
                  {" "}
                  <FontAwesomeIcon icon={faCirclePlus} />
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
