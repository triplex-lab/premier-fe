import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';


import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

import Balance from "../../component/balance/Balance";
import Package from "../../component/package/Package";
import User from "../../component/user/User";
import s from "./Bar.module.css";


export default function Bar({isMobileMode, setIsMobileMode}) {

  const user = useSelector(({user}) => user);

  //const getUser = async () => {
  //  const res = await axios.get(`http://localhost:5000/api/user?id=${user.id}`)
  //}

  //useEffect(() => {
  //  getUser()
  //}, [])

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
      <div className={s.package + ' ' + s.barItem}>
        <Package />
      </div>
      <div className={s.elevation + ' ' + s.barItem}>
        <p>elevation</p>
      </div>
      <div className={s.balance + ' ' + s.barItem}>
        <NavLink to={`/dashboard/finance`}>
          <Balance />
        </NavLink>
      </div>
      <NavLink className={s.userActions + ' ' + s.barItem} to={`/dashboard/settings`}>
        <User />
      </NavLink>
    </div>
  );
}
