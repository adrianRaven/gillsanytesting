import React from "react";
import "../css/AccessorieItem.css";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function AccessorieItem({ props, childToParent }) {
  const data = 0;
  console.log(data);
  return (
    <div>
      {" "}
      {props?.map((p) => (
        <div key={p.id} className="itemAccessory__container">
          <div className="accessory__img__container">
            <img
              alt={p.name}
              className="img__accessory"
              src={require(`../img/accesorio1.png`)}
            />
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
              <button onClick={() => childToParent(data)}>
                <div className="quantityItem-minus">
                  <FontAwesomeIcon icon={faCircleMinus} />
                </div>
              </button>{" "}
              <div className="accessory__quantityItem">{data} </div>
              <button
                className="accessory__button___noDecorations"
                onClick={() => childToParent(data + 1)}
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
