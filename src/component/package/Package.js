import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import s from "./Package.module.css";
import { Button, Popover } from "@material-ui/core";

export default function Package() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div>
        <p className={s.text}>
          Пакет
          <InfoIcon
            aria-describedby={id}
            onClick={handleClick}
            className={s.icon}
            style={{ color: "#bec3d1" }}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className={s.in}>
              some business info
              <div>
                Ваш пакет BUSINESS Дата регистрации 30.01.2021 Спонсор 1 1
                Положение в бинаре Справа Приглашенных 4
              </div>
              <div>Активность партнерская Активность до Нет Активности!</div>
            </div>
          </Popover>
        </p>
        <p className={s.text}>Квалификация</p>
      </div>
    </>
  );
}
