import React, { useState } from "react";
import InfoIcon from "@material-ui/icons/Info";
import { Popover } from "@material-ui/core";

import s from "./Package.module.css";


export default function Package({generalData}) {

  const [anchorEl, setAnchorEl] = useState(null);

  if (!generalData) {
    return null;
  }
  let { activePackName, qual} = generalData.currentUserInfo;
  let { invitedCount, legInfo, inviterFullName } = generalData;
  let { createdAt } = generalData.currentUser;

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
      <div className={s.root}>
        <p className={s.text}>
          Пакет
          <InfoIcon
            aria-describedby={id}
            onClick={handleClick}
            className={s.icon}
            style={{ color: "#bec3d1", marginLeft: 'auto'}}
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
              <b><h3 style={{margin: 0}}>Some business info</h3></b>
              <div>
                <p>Ваш пакет {activePackName}</p>
                <p>Дата регистрации {createdAt.slice(0, 10)}</p>
                <p>Спонсор {inviterFullName}</p>
                <p>Положение в бинаре {legInfo.setting}</p>
                <p>Приглашенных {invitedCount}</p>
              </div>
              <div>Активность партнерская Активность до Нет Активности!</div>
            </div>
          </Popover>
        </p>
        <p className={s.textOpacity}>{qual}</p>
      </div>
    </>
  );
}
