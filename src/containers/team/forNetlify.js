//BINARYTREE
export class ReferalNode {
    constructor(id, data, childrens=[]) {
      this.id = id;
      this.data = data;
      this.childrens = childrens.length ? childrens : [];
    }
  }
  
  export class BinaryTree {
    constructor(data) {
      this.data = data;
      this.middleIndex = data && Math.floor(data.length / 2);
    }
  
    static convertToNodes = (array) => {
      let nodes = array.map(node => {
        if (node.childrens) {
          return new ReferalNode(
            node.id,
            {
              email: node.email,
              info: node.info,
            },
            [...BinaryTree.convertToNodes(node.childrens)]);
        }
        return new ReferalNode(
          node.id,
          {
            email: node.email,
            info: node.info,
          },
          []
        );
      })
      return nodes;
    }
  
    static updater(id, array, data) {
      let found = false;
      if (!array || !data) {
        return;
      }
      if (found) {
        return;
      }
      array.forEach(node => {
        console.log(node.id, id)
        if (node.id === id) {
          found = true;
          node.childrens = data;
          return;
        } else {
          this.updater(id, node.childrens, data);
        }
      })
      return array;
    }
  
    left() {
      if (!this.data.length) {
        return [];
      } else {
        let left = this.data.slice(0, this.middleIndex);
        return BinaryTree.convertToNodes(left);
      }
    }
  
    right() {
      if (!this.data.length) {
        return [];
      } else {
        let right = this.data.slice(this.middleIndex, this.data.length);
        return BinaryTree.convertToNodes(right);
      }
    }
  }
  

  //LINEARREFARALS

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


//REFERAL

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


///REFERALSBINARYTREE

import React from 'react';
import axios from 'axios';

import s from './Team.Module.css'
import Referal from './Referal';
import { BinaryTree } from './BinaryTree';


export default class ReferalsBinaryTree extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      referals: [],
    }
  }

  getReferalsByUserId = async () => {
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
      if (!this.state.referals.length && res.length) {
        this.setState({
          referals: [...res.map(referal => {
            return {
              ...referal,
              childrens: [],
            }
          })],
        });
      }
      return res;
    }
  }

  componentDidMount() {
    this.getReferalsByUserId();
  }

  render() {
    const { referals } = this.state;
    const binaryTree = new BinaryTree([...referals]);

    return (
      <div className={s.referalsRow}>
          {binaryTree.left && binaryTree.left().map(referalNode => {
            return <Referal
              referal={referalNode.data}
              referals={referals}
              setReferals={(newState) => this.setState({...newState})}
              childrens={referalNode.childrens}
              id={referalNode.id}
              key={referalNode.id}
            />
          })}
          {binaryTree.right && binaryTree.right().map(referalNode => {
            return <Referal
              referal={referalNode.data}
              referals={referals}
              setReferals={(newState) => this.setState({...newState})}
              childrens={referalNode.childrens}
              id={referalNode.id}
              key={referalNode.id}
            />
          })}
      </div>
    )
  }
}


//TEAM

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

//TEAM.MODULE.CSS

//.root {
//    min-height: 100%;
//    display: flex;
//    flex-direction: column;
//    justify-content: flex-start;
//    align-items: center;
//    padding-top: 50px;
//    padding-bottom: 40px;
//  }
  
//  .referalsSection {
//    width: 100%;
//    align-self: center;
//    height: 100%;
//  }
  
//  .referalsRow {
//    display: flex;
//    flex-direction: row;
//    width: fit-content;
//    max-width: 100%;
//    overflow-x: auto;
//    position: absolute;
//    left: 50%;
//    transform: translateX(-50%);
//    height: 100%;
//  }
  
//  .linearReferalsRow {
//    flex-wrap: wrap;
//    display: flex;
//    flex-direction: row;
//    max-width: 100%;
//    justify-content: space-around;
//    align-items: center;
//  }
  
//  .referal {
//    width: 150px;
//    height: 200px;
//    padding: 15px;
//    display: flex;
//    flex-direction: column;
//    justify-content: space-around;
//    align-items: center;
//    margin: 20px;
//  }
  
//  .referalName {
//    max-width: 140px;
//    overflow: hidden;
//    text-overflow: ellipsis;
//    margin-bottom: 7px;
//    font-size: 19px;
//  }
  
//  .referalEmail {
//    max-width: 140px;
//    overflow: hidden;
//    text-overflow: ellipsis;
//    margin-bottom: 7px;
//    font-size: 19px;
//  }
  
//  .removeButton {
//    margin-top: 10px !important;
//  }
  
//  .referalsContainer {
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//  }
  
//  .referalChildrens {
//    display: flex;
//    flex-direction: row;
//  }
  
//  .currUser {
//    display: flex;
//    flex-direction: column;
//    min-height: 150px;
//    min-width: 150px;
//    justify-content: center;
//    padding: 15px;
//    margin: 30px 0px;
//  }
  
//  .currUserName, .linearUserName {
//    max-width: 180px;
//    overflow: hidden;
//    text-overflow: ellipsis;
//    margin-bottom: 7px;
//    font-size: 19px;
//    display: flex;
//    flex-direction: row;
//    align-items: center;
//    justify-content: space-between;
//  }
  
//  .currUserEmail, .linearUserEmail {
//    max-width: 180px;
//    overflow: hidden;
//    text-overflow: ellipsis;
//    margin-bottom: 7px;
//    font-size: 19px;
//  }
  
//  .circle {
//    width: 50px;
//    height: 50px;
//    border-radius: 50%;
//    background-color: #bdbdbd;
//  }
  
//  .linearUser {
//    max-height: 200px;
//    min-width: 200px;
//  }
  
//  .linearUserContainer {
//    display: flex;
//    flex-direction: column;
//    justify-content: center;
//    padding: 15px;
//    margin: 20px;
//  }
  