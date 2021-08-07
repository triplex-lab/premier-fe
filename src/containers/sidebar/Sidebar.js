import React, { useState } from "react";

import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Nav from "../../component/nav/Nav";
import s from "./Sidebar.module.css";
import logo from "../../images/logo.png";
import GroupModal from "../../component/GroupModal";

export default function Sidebar({isMobileMode, setIsMobileMode}) {

  const [isGroupModalOpen, setGroupModalOpen] = useState(false);

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
          <Button
            color="primary"
            variant="outlined"
            style={{ color: "#dddddd" }}
            onClick={() => setGroupModalOpen(true)}
          >
            <GroupAddIcon className={s.icon} />
            Пригласить в&nbsp;команду
          </Button>
          <Nav setIsMobileMode={(val) => setIsMobileMode(val)}/>
        </div>
        <GroupModal isOpen={isGroupModalOpen} setIsOpen={(val) => setGroupModalOpen(val)} />
      </div>
    </ClickAwayListener>
  );
}
