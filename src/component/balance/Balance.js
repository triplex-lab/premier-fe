import React from "react";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import s from "./Balance.module.css";

export default ({generalData}) => {
  if (!generalData) {
    return null;
  }
  const { money } = generalData.currentUser;
  const { MONEY_SYMBOL } = generalData;

  return (
    <div className={s.root}>
      <p className={s.number}>
        <span className={s.icon}><AccountBalanceWalletIcon fontSize='inherit' color='inherit'/></span>
        {money} {MONEY_SYMBOL}
      </p>
    </div>
  );
}
