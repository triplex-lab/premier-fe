import React from "react";
import { NavLink } from "react-router-dom";
import Balance from "../../component/balance/Balance";
import Package from "../../component/package/Package";
import User from "../../component/user/User";
import s from "./Bar.module.css";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Grid, Typography} from "@material-ui/core";

export default function Bar(props) {
  return (
      <Grid container spacing={1} justify="space-around" alignItems="center" className={s.root} style={ {margin: 0, width: '100%' } }>
        <Grid container item xs spacing={0} alignItems="center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.toggle}
          >
            <MenuIcon />
          </IconButton>
          <Grid container item xs spacing={0}>
            <Typography variant='h6'>Premier-club</Typography>
          </Grid>
        </Grid>
        <Grid container item xs spacing={0} alignItems="center">
          <Grid container item xs={12} sm spacing={0}>
            <NavLink to={`/dashboard/settings`}>
              <User />
            </NavLink>
          </Grid>
          <Grid container item xs={12} sm spacing={0}>
            <Package />
          </Grid>
          <Grid container item xs={12} sm spacing={0}>
            <p>elevation</p>
          </Grid>
          <Grid container item xs={12} sm spacing={0}>
            <NavLink to={`/dashboard/finance`}>
              <Balance />
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
  );
}
