import React from "react";
import s from "./MyButton.module.css";
import { LoaderSmall } from "../LoaderSmall/LoaderSmall";

function switchStale(style) {
  switch (style) {
    case "orange":
      return s.ButtonOrange;
    case "transparent":
      return s.ButtonTransparent;
    case "white":
      return s.ButtonWhite;
    case "bordered":
      return s.ButtonBordered;
    default:
      return s.ButtonGrey;
  }
}

export default function MyButton({
  type = "button",
  style,
  loading,
  label = "not label",
  disabled,
  handleClick,
}) {
  const staleName = switchStale(style);
  return (
    <button
      disabled={disabled}
      type={type}
      className={staleName}
      onClick={handleClick}
    >
      {loading ? <LoaderSmall /> : <span>{label}</span>}
    </button>
  );
}
