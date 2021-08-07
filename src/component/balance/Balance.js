import React from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import s from "./Balance.module.css";

export default function Balance() {
  const number = 3245.18;
  return (
    <div className={s.root}>
      <p className={s.number}>
        <span className={s.icon}><AccountBalanceWalletIcon fontSize='inherit' color='inherit'/></span>
        {number} y.e.
      </p>
    </div>
  );
}
