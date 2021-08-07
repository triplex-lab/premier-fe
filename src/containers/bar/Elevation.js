import React, { useState, useEffect } from 'react';
import axios from 'axios';

import s from './Bar.module.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


export default () => {

  const [leg, setLeg] = useState(null);
  const [currLeg, setCurrLeg] = useState(null);


  const getLeg = async () => {
    await axios.get('/dashboard')
      .then(res => {
        console.log(res)
        if (res.data && res.data.legInfo) {
          setLeg(res.data.legInfo)
        }
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (!leg) {
      getLeg();
    }
  }, [])

  if (!leg) {
    return <p>Elevation</p>;
  }

  const activeSideStyle = {
    color: '#ec860d',
    border: "3px solid #ec860d",
  }

  const activeStyle = {
    color: '#fff',
    backgroundColor: '#ec860d',
  }

  return <div className={s.elevation}>
    <div onClick={() => setCurrLeg('left')} className={s.elevationItem}>
    <div style={currLeg === 'left' ? activeSideStyle : {}} className={s.iconHolder}>
      <ChevronLeftIcon color='inherit' fontSize='inherit'/>
    </div>
      <b>B: {leg.left.total}</b>
    </div>
    <div style={currLeg === 'auto' ? activeStyle : {}} onClick={() => setCurrLeg('auto')} className={s.centerItem}>
      A
    </div>
    <div onClick={() => setCurrLeg('right')} className={s.elevationItem}>
      <b>B: {leg.right.total}</b>
      <div style={currLeg === 'right' ? activeSideStyle : {}} className={s.iconHolder}>
        <ChevronRightIcon color='inherit' fontSize='inherit'/>
      </div>
    </div>
  </div>
} 