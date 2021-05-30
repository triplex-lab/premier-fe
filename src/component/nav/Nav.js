import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../redux/auth/authOperations";
import s from "./Nav.module.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import SchoolIcon from "@material-ui/icons/School";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DescriptionIcon from "@material-ui/icons/Description";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Nav() {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);

  const out = async () => {
    await dispatch(signOut(token));
  };

  return (
    <div className={s.nav}>
      <NavLink to={`/dashboard`}>
        <DashboardIcon className={s.icon} />
        Главная
      </NavLink>
      <NavLink to={`/dashboard/team`}>
        <SupervisorAccountIcon className={s.icon} />
        Команда
      </NavLink>
      <NavLink to={`/dashboard/school`}>
        <SchoolIcon className={s.icon} />
        База знаний
      </NavLink>
      <NavLink to={`/dashboard/finance`}>
        <AccountBalanceWalletIcon className={s.icon} />
        Мой кошелек
      </NavLink>
      <NavLink to={`/dashboard/store`}>
        <ShoppingBasketIcon className={s.icon} />
        Premier Store
      </NavLink>
      <NavLink to={`/dashboard/instruction`}>
        <DescriptionIcon className={s.icon} />
        Инструкции
      </NavLink>
      <NavLink to={`/dashboard/settings`}>
        <SettingsIcon className={s.icon} />
        Настройки
      </NavLink>
      <NavLink to={`/dashboard/support`}>
        <HelpIcon className={s.icon} />
        Поддержка
      </NavLink>
      <a className={s.outBtn} onClick={() => out()}>
        <ExitToAppIcon className={s.icon} /> Out
      </a>
    </div>
  );
}
