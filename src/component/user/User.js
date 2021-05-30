import React from "react";
import { Avatar } from "@material-ui/core";
import s from "./User.module.css";
import { useSelector } from "react-redux";

export default function User() {
  const info = useSelector((state) => state.info);
  let name = "Name";
  let lastname = "Lastname";
  if (info !== undefined) {
    name = info.name;
    lastname = info.lastname;
  }
  return (
    <div className={s.root}>
      <Avatar alt={`${name}`} src="/broken-image.jpg" />
      <div className={s.wrap}>
        <p className={s.name}>{name}</p>
        <p className={s.name}>{lastname}</p>
      </div>
    </div>
  );
}
