import React, { useState } from "react";
import { Paper, Button } from '@material-ui/core';
import { useSelector } from "react-redux";

import s from './Team.Module.css';
import ReferalsBinaryTree from "./ReferalsBinaryTree";
import LinearReferals from "./LinearReferals";


export default () => {

  const [mode, setMode] = useState('linear');

  const currUser = useSelector(({ user }) => user);

  const changeModeHandler = () => {
    setMode((prevState) => {
      if (prevState === 'linear') {
        return 'binaryTree';
      } else {
        return 'linear';
      }
    })
  }

  return <div className={s.root}>
    <Button
      onClick={changeModeHandler}
      variant='outlined'
      color='primary'
    >
      Change mode {mode}
    </Button>
    <Paper className={s.currUser}>
      {currUser.id && <span className={s.currUserName}>
        <div className={s.circle}></div>
        userID: {currUser.id}
      </span>}
      {currUser.email && <span className={s.currUserEmail}>Email: {currUser.email}</span>}
    </Paper>
    <div className={s.referalsSection}>

      {mode === 'binaryTree' && <ReferalsBinaryTree />}

      {mode === 'linear' && <LinearReferals userID={currUser.id}/>}

    </div>
  </div>
}
