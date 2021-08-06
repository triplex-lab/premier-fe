import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Paper, Button } from '@material-ui/core'

import s from './Team.Module.css';
import ReferalsRenderer from "./ReferalsRenderer";
import Referal from './Referal';


export default () => {

  const [referalsArray, setReferalsArray] = useState([]);
  const [mode, setMode] = useState('binaryTree');

  const getReferalsByUserId = async (id=200) => {
    const res = await axios.get(`http://localhost:5000/api/user/${id}/ref`)
    .then(response => {
      return response.data;
    })
    if (!referalsArray.length && res.length) {
      setReferalsArray([res]);
    }
    return res;
  }

  const changeModeHandler = () => {
    setMode((prevState) => {
      if (prevState === 'linear') {
        return 'binaryTree';
      } else {
        return 'linear';
      }
    })
  }

  useEffect(() => {
    getReferalsByUserId();
  }, [])

  return <div className={s.root}>
    <Button
      onClick={changeModeHandler}
      variant='outlined'
      color='primary'
    >
      Change mode
    </Button>
    <Paper className={s.referalsSection}>
      {mode === 'binaryTree' && referalsArray.length && referalsArray.map((referals, index) => {
        return <ReferalsRenderer
          key={index}
          referals={referals}
          referalsArray={referalsArray}
          setReferalsArray={setReferalsArray}
        />
      })}
      {mode === 'linear' && referalsArray[0].map((referal, index) => {
        return <div className={s.referalsContainer}>
          <Referal
            key={index}
            referal={referal}
          />
        </div>
      })}
    </Paper>
  </div>
}
