import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@material-ui/core';

import s from './Team.Module.css';


export default () => {

  const [referalsArray, setReferalsArray] = useState([]);
  const getReferalsByUserId = async () => {
    const user = await axios
      .get("/api/user")
      .then(response => response.data)
      .catch(error => {
        console.log(error)
        return null
      })
    if (user) {
      const res = await axios.get(`/team`)
      .then(response => {
        return response.data;
      })
      if (!referalsArray.length && res.length) {
        setReferalsArray([res]);
      }
      return res;
    } else {
      return;
    }
  }

  console.log({referalsArray})

  useEffect(() => {
    getReferalsByUserId();
  }, []);

  return (
    <div className={s.linearReferalsRow}>
      {referalsArray.length > 0 && referalsArray[0].map(referal => {
        return <div key={referal.id} className={s.linearUser}>
          <Paper className={s.linearUserContainer}>
            {referal.id && <span className={s.linearUserName}>
              <div className={s.circle}></div>
              userID: {referal.id}
            </span>}
            {referal.email && <span className={s.linearUserEmail}>Email: {referal.email}</span>}
          </Paper>
        </div>
      })}
    </div>
  );
}
