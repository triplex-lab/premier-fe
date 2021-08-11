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
        console.log(response.data.subnodes)
        return response.data.subnodes;
      })
      if (!referalsArray.length && res.length) {
        setReferalsArray([res]);
      }
      return res;
    } else {
      return;
    }
  }

  const createName = (firstName, lastName) => {
    return `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;
  }

  useEffect(() => {
    getReferalsByUserId();
  }, []);

  return (
    <div className={s.linearReferalsRow}>
      {referalsArray.length > 0 && referalsArray[0].map(referal => {
        return <div key={referal.id} className={s.linearUser}>
          <Paper className={s.linearUserContainer}>
            {referal.id && <span className={s.linearUserName}>
              <div className={s.circle}>
                {referal.user && referal.user.firstname[0].toUpperCase()}
              </div>
             <span className={s.userName}>{referal.user && createName(referal.user.firstname, referal.user.lastname)}</span>
            </span>}
            {referal.user && <span className={s.linearUserEmail}><b>email:</b> {referal.user.email}</span>}
            {referal.user && <span className={s.linearUserEmail}><b>qualify:</b> {referal.user.qual}</span>}
          </Paper>
        </div>
      })}
    </div>
  );
}
