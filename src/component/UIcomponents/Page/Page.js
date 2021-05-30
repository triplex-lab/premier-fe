import React from "react";
import s from "./Page.module.css";

export default function Page({ children }) {
  return <div className={s.page}>{children}</div>;
}
