import React from "react";
import { Avatar } from "@material-ui/core";
import s from "./User.module.css";
import { useSelector } from "react-redux";

export default function User() {
  const info = useSelector((state) => state.info);
  let name = "Name";

  return (
    <div className={s.root}>
      <Avatar alt={`${name}`} src="/broken-image.jpg" />
    </div>
  );
}
