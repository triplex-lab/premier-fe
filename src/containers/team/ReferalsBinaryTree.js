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
      const res = await axios.get(`http://localhost:5000/api/user/${user.id}/ref`)
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