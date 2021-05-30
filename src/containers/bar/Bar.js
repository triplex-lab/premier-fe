import React from "react";
import { NavLink } from "react-router-dom";
import Balance from "../../component/balance/Balance";
import Package from "../../component/package/Package";
import User from "../../component/user/User";
import s from "./Bar.module.css";

export default function Bar() {
  return (
    <div className={s.root}>
      <NavLink to={`/dashboard/settings`}>
        <User />
      </NavLink>
      <Package />
      <p>elevation</p>
      <NavLink to={`/dashboard/finance`}>
        <Balance />
      </NavLink>
    </div>
  );
}
