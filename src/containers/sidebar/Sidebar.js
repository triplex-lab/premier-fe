import React, { useEffect } from "react";

import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Nav from "../../component/nav/Nav";
import s from "./Sidebar.module.css";
import logo from "../../images/logo.png";

export default function Sidebar({isMobileMode, setIsMobileMode}) {

  if (isMobileMode) {
    return null;
  }

  return (<ClickAwayListener onClickAway={() => setIsMobileMode(true)}>
      <div className={s.root}>
        <div onClick={() => setIsMobileMode(true)} className={s.closeIcon}>
          <CloseIcon fontSize='inherit' color='inherit'/>
        </div>
        <div className={s.sidebar}>
          <img className={s.img} src={logo} alt="logo" />
          <Button color="primary" variant="outlined" style={{ color: "#dddddd" }}>
            <GroupAddIcon className={s.icon} />
            Пригласить в&nbsp;команду
          </Button>
          <Nav setIsMobileMode={(val) => setIsMobileMode(val)}/>
        </div>
      </div>
    </ClickAwayListener>
  );
}
