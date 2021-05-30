import React from "react";
import Nav from "../../component/nav/Nav";
import s from "./Sidebar.module.css";
import logo from "../../images/logo.png";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Button } from "@material-ui/core";

export default function Sidebar() {
  return (
    <div className={s.root}>
      <div className={s.sidebar}>
        <img className={s.img} src={logo} alt="logo" />
        <Button color="primary" variant="outlined" style={{ color: "#dddddd" }}>
          <GroupAddIcon className={s.icon} />
          Пригласить в&nbsp;команду
        </Button>
        <Nav />
      </div>
    </div>
  );
}
