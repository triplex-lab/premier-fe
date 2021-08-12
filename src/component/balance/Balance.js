import React from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import s from "./Balance.module.css";

export default ({currentUser}) => {
  if (!currentUser) {
    return null;
  }
  const { money, MONEY_SYMBOL} = currentUser;

  return (
    <div className={s.root}>
      <p className={s.number}>
        <span className={s.icon}><AccountBalanceWalletIcon fontSize='inherit' color='inherit'/></span>
        {money} {MONEY_SYMBOL}
      </p>
    </div>
  );
}
