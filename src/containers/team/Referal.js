import React from 'react';
import { Button, Paper } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';

import s from './Team.Module.css';


export default class Referal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      controlButtonsMode: 'forward',
      referers: [],
    }

    this.setReferalsArray = props.setReferalsArray;
    this.referalsArray = props.referalsArray;
  }

  updateReferers = async (id) => {
    await axios.get(`http://localhost:5000/api/user/${id}/ref`)
      .then(res => {
        if (res.data.length) {
          this.setReferalsArray((prevState) => [...prevState, [...res.data]]);
          this.setState(
            {controlButtonsMode: 'backward', referers: [...res.data],}
          );
        }
      })
  }

  removeReferals = () => {
    let filteredArray = [];
  
    this.setReferalsArray((prevState) => {
      prevState.forEach(array => {
        let filtered = array.filter(item => !this.state.referers.includes(item));
        if (filtered.length) {
          filteredArray.push(filtered);
        }
      })
      return filteredArray;
    })
    this.setState({controlButtonsMode: 'forward'})
  }

  render() {
    const { controlButtonsMode } = this.state;
    const { referal } = this.props;

    return <Paper className={s.referal}>
      <span className={s.referalName}>{referal.id && referal.id}</span>
      <span className={s.referalEmail}>{referal.email && referal.email}</span>
      {this.referalsArray && <Button
        variant="outlined"
        color="primary"
        disabled={controlButtonsMode === 'backward'}
        onClick={() => this.updateReferers(referal.id)}
      >
        Update
      </Button>}
      {this.referalsArray && <Button
        className={s.removeButton}
        variant="outlined"
        disabled={controlButtonsMode === 'forward'}
        onClick={() => this.removeReferals()}
      >
        disUpdate
      </Button>}
  </Paper>
  }
}