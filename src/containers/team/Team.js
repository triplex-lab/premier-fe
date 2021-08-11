import React, { useState, useEffect } from "react";
import { Paper, Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import s from './Team.Module.css';
import ReferalsBinaryTree from "./ReferalsBinaryTree";
import LinearReferals from "./LinearReferals";
import { getCurrentUser } from "../../redux/user/userOperations";


export default () => {

  const [mode, setMode] = useState('linear');
  const [currentLeg, setCurrentLeg] = useState('');

  const currUser = useSelector(({ user }) => user);

  if (!currUser) {
    return null;
  }

  useEffect(() => {
    if (currUser.legInfo) {
      setCurrentLeg(currUser.legInfo.setting);
    }
  }, [currUser]);

  const dispatch = useDispatch();

  const changeModeHandler = () => {
    setMode((prevState) => {
      if (prevState === 'linear') {
        return 'binaryTree';
      } else {
        return 'linear';
      }
    })
  }

  const setLegHandler = (legParam) => {
    if (legParam === currentLeg) {
      return;
    } else {
      axios.get(`/setLeg?leg=${legParam}`)
        .then(res => {
          if (res.status === 200 && res.data) {
            setCurrentLeg(legParam)
            dispatch(getCurrentUser());
          }
        })
        .catch(err => console.log(err))
    } 
  }

  const createName = (firstName, lastName) => {
    return `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;
  }

  return <div className={s.root}>
    <h2 style={{margin: 0, alignSelf: 'flex-start'}}>Команда</h2>
    <div className={s.teamBar}>
      <Button
        className={s.controllButton}
        onClick={changeModeHandler}
        variant='outlined'
        color='primary'
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span>Сменить режим</span>
          <span>Текущий: {mode}</span>
        </div>
      </Button>
      <Button
        color='inherit'
        variant='outlined'
        className={s.controllButton}
        onClick={() => {
          const legParam = currentLeg === 'left' ? 'right' : 'left';
          setLegHandler(legParam);
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span>Сменить ногу</span>
          <span>Текущая: {currentLeg}</span>
        </div>
      </Button>
    </div>
    <Paper className={s.currUser}>
      {currUser && <span className={s.currUserName}>
        <div className={s.circle}>
          {currUser.firstname && currUser.firstname[0].toUpperCase()}
        </div>
        {createName(currUser.firstname, currUser.lastname)}
      </span>}
      {currUser.email && <span className={s.currUserEmail}><b>email:</b> {currUser.email}</span>}
    </Paper>
    <div className={s.referalsSection}>

      {mode === 'binaryTree' && <ReferalsBinaryTree />}

      {mode === 'linear' && <LinearReferals />}

    </div>
  </div>
}
