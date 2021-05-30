import React from "react";
import s from "./MainLogo.module.css";
import logo from "../../images/logo.png";

export default function MainLogo() {
  return (
    <div className={s.root}>
      <img className={s.img} src={logo} alt="logo" />
    </div>
  );
}
