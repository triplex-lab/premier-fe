import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";

import s from './Bar.module.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getCurrentUser } from "../../redux/user/userOperations";



export default ({currentUser}) => {

  if (!currentUser || !currentUser.legInfo) {
    return null;
  }

  const leg = currentUser.legInfo;
  const currentLeg = currentUser.legInfo.setting;

  if (!leg) {
    return <p>Elevation</p>;
  }

  const dispatch = useDispatch();

  const setLegHandler = (legParam) => {
    if (legParam === currentLeg) {
      return;
    } else {
      axios.get(`/setLeg?leg=${legParam}`)
        .then(res => {
          if (res.status === 200 && res.data) {
            dispatch(getCurrentUser())
          }
        })
        .catch(err => console.log(err))
    } 
  }

  const activeStyle = {
    color: '#ec860d',
    border: "3px solid #ec860d",
  }

  return <div className={s.elevation}>
    <div onClick={() => setLegHandler('left')} className={s.elevationItem}>
    <div style={currentLeg === 'left' ? activeStyle : {}} className={s.iconHolder}>
      <ChevronLeftIcon color='inherit' fontSize='inherit'/>
    </div>
      <b style={{fontSize: '18px'}}>B: {leg.left && leg.left.total}</b>
    </div>
    <div className={s.centerItem}>
      A
    </div>
    <div onClick={() => setLegHandler('right')} className={s.elevationItem}>
      <b style={{fontSize: '18px'}}>B: {leg.right && leg.right.total}</b>
      <div style={currentLeg === 'right' ? activeStyle : {}} className={s.iconHolder}>
        <ChevronRightIcon color='inherit' fontSize='inherit'/>
      </div>
    </div>
  </div>
} 