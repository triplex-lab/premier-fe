import React from "react";
import { NavLink } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Balance from "../../component/balance/Balance";
import Package from "../../component/package/Package";
import User from "../../component/user/User";
import s from "./Bar.module.css";


export default function Bar({isMobileMode, setIsMobileMode}) {
  return (
    <div className={s.root}>
      <div
        onClick={() => setIsMobileMode(false)}
        className={s.menuButton}
      >
        <IconButton color="inherit">
          <MenuIcon fontSize={'large'} />
        </IconButton>
      </div>
      <div className={s.package}>
      <Package />
      </div>
      <div className={s.elvation}>
      <p>elevation</p>
      </div>
      <div className={s.balance}>
        <NavLink to={`/dashboard/finance`}>
          <Balance />
        </NavLink>
      </div>
      <NavLink className={s.userActions} to={`/dashboard/settings`}>
        <User />
      </NavLink>
    </div>
  );
}
