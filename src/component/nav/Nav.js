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

export default function Nav({setIsMobileMode}) {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);

  const out = async () => {
    await dispatch(signOut(token));
  };

  const NavItem = ({to, className, children}) => {
    return <NavLink to={to} className-={className} onClick={() => setIsMobileMode(true)}>
      {children}
    </NavLink>
  }

  return (
    <div className={s.nav}>
      <NavItem to={`/dashboard`}>
        <DashboardIcon className={s.icon} />
        Главная
      </NavItem>
      <NavItem to={`/dashboard/team`}>
        <SupervisorAccountIcon className={s.icon} />
        Команда
      </NavItem>
      <NavItem to={`/dashboard/school`}>
        <SchoolIcon className={s.icon} />
        База знаний
      </NavItem>
      <NavItem to={`/dashboard/finance`}>
        <AccountBalanceWalletIcon className={s.icon} />
        Мой кошелек
      </NavItem>
      <NavItem to={`/dashboard/store`}>
        <ShoppingBasketIcon className={s.icon} />
        Premier Store
      </NavItem>
      <NavItem to={`/dashboard/instruction`}>
        <DescriptionIcon className={s.icon} />
        Инструкции
      </NavItem>
      <NavItem to={`/dashboard/settings`}>
        <SettingsIcon className={s.icon} />
        Настройки
      </NavItem>
      <NavItem to={`/dashboard/support`}>
        <HelpIcon className={s.icon} />
        Поддержка
      </NavItem>
      <a className={s.outBtn} onClick={() => out()}>
        <ExitToAppIcon className={s.icon} /> Out
      </a>
    </div>
  );
}
