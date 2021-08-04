import React from 'react';
import { Button, Paper } from '@material-ui/core';
import axios from 'axios';

import s from './Team.Module.css';
import { BinaryTree } from './BinaryTree';


const Referal = (referal, referals, setReferals, childrens, id) => {

  if (!referal) {
    return null;
  }

  const addReferal = async (id) => {
    let updatedReferals = [];
    const res = await axios.get(`http://localhost:5000/api/user/${id}/ref`)
      .then(response => {
        return response.data;
      })
      .then(updatedReferals => updatedReferals.map(updatedReferal => new Object({...updatedReferal, childrens: []})));

    if (res.length) {
      updatedReferals = BinaryTree.updater(id, [...referals], res);
      setReferals(updatedReferals);
    }
  }

  const removeReferal = async (id) => {
    let updatedReferals = BinaryTree.updater(id, [...referals], []);
    setReferals(updatedReferals);
  }

  return <div className={s.referalsContainer}>
    <Paper className={s.referal}>
      {id && <span className={s.referalName}>{id}</span>}
      {referal.email && <span className={s.referalEmail}>{referal.email}</span>}
      {<Button
        variant="outlined"
        color="primary"
        onClick={() => addReferal(id)}
      >
        Update
      </Button>}
      {<Button
        className={s.removeButton}
        variant="outlined"
        onClick={() => removeReferal(id)}
      >
        disUpdate
      </Button>}
    </Paper>
    <div className={s.referalChildrens}>
        {childrens.length > 0 && childrens.map(children => {
          return Referal(children.data, referals, setReferals, children.childrens, children.id)
        })}
    </div>
  </div>
}



export default ({referal, referals, setReferals, childrens, id}) => {
  return Referal(referal, referals, setReferals, childrens, id);
}
