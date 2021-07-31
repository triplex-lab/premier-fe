import React from 'react';

import s from './Team.Module.css';
import Referal from './Referal';


export default ({referals, referalsArray, setReferalsArray}) => {
  return (
    <div
      className={s.referalsRow}
    >
      {referals.length && referals.map((referal, index) => {
        return <Referal
          key={index}
          referal={referal}
          referalsArray={referalsArray}
          setReferalsArray={setReferalsArray}
        />
      })}
    </div>
  );
}