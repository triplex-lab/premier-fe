import React, { useEffect, useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

import Balance from "../../component/balance/Balance";
import Package from "../../component/package/Package";
import User from "../../component/user/User";
import s from "./Bar.module.css";
import Elevation from "./Elevation";

export default function Bar({setIsMobileMode}) {

  const [generalData, setGeneralData] = useState(null);
  const currUser = useSelector(({user}) => user);

  const getGeneralData = async () => {
    await axios.get('/dashboard')
      .then(res => {
        if (res.data && res.data.legInfo) {
          setGeneralData(res.data);
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (!generalData) {
      getGeneralData();
    }
  }, [currUser])

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
        <Package
          generalData={generalData}
        />
      </div>
      <div className={s.barElevation}>
        <Elevation
          currentUser={currUser}
        />
      </div>
      <div className={s.balance + ' ' + s.barItem}>
        <NavLink to={`/dashboard/finance`}>
          <Balance
            currentUser={currUser}
          />
        </NavLink>
      </div>
      <NavLink className={s.userActions + ' ' + s.barItem} to={`/dashboard/settings`}>
        <User />
      </NavLink>
    </div>
  );
}
