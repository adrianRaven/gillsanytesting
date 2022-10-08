import React from "react";
import "./Slider.css";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <div className="iconButton">
        {direction === "next" ? (
          <FontAwesomeIcon icon={faCircleChevronRight} />
        ) : (
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        )}{" "}
      </div>
    </button>
  );
}
