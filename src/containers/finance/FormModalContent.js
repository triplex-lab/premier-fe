import React, { Fragment, useState } from 'react';
import {
  TextField,
  FormControl,
  DialogActions,
  DialogContent,
  Button,
  CircularProgress ,
} from '@material-ui/core';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../redux/user/userOperations';

import s from "./Finance.module.css";


export default ({formMode, setForm, form, onClose}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const dispatch = useDispatch();

  const onCloseModal = () => {
    onClose();
    setStatusMessage('')
  }

  switch (formMode) {
    case 'purchase': {
    let isFormFilled = form.amount > 0;

    const handleReplenishment = async () => {
      setIsLoading(true);
      if (!isFormFilled || isLoading) {
        return;
      }
      await axios
        .post(`/finance/add`, form)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            dispatch(getCurrentUser())
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        });
    }
    return (<Fragment>
      <DialogContent className={s.dialogContent}>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="normal"
            label="Сумма"
            type="number"
            fullWidth
            error={form.amount <= 0}
            value={form.amount}
            onChange={(e) => setForm({...form, amount: e.target.value})}
            helperText={form.amount <= 0 && 'Сумма должна быть больше 0'}
          />
        </FormControl>
        {isLoading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal} color="primary">
          Cancel
        </Button>
        <Button disabled={isLoading || !isFormFilled} onClick={handleReplenishment} color="primary">
          Next
        </Button>
      </DialogActions>
    </Fragment>);
  }

    case 'output':{
      let isFormFilled = form.amount > 0;
  
      const handleReplenishment = async () => {
        setIsLoading(true);
        if (!isFormFilled || isLoading) {
          return;
        }
        await axios
          .post(`/finance/out`, form)
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              dispatch(getCurrentUser())
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false)
          });
      }
      return (<Fragment>
        <DialogContent className={s.dialogContent}>
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="normal"
              label="Сумма"
              type="number"
              fullWidth
              error={form.amount <= 0}
              value={form.amount}
              onChange={(e) => setForm({...form, amount: e.target.value})}
              helperText={form.amount <= 0 && 'Сумма должна быть больше 0'}
            />
          </FormControl>
          {isLoading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal} color="primary">
            Cancel
          </Button>
          <Button disabled={isLoading || !isFormFilled} onClick={handleReplenishment} color="primary">
            Next
          </Button>
        </DialogActions>
      </Fragment>);
    }
  

    case 'transfer': {
    let isFormFilled = form.amount > 0 && form.login ? true : false;

    const transferHandler = async () => {
      setIsLoading(true);
      if (!isFormFilled || isLoading) {
        return;
      }
      await axios
        .post("/finance/transfer", {
          ...form,
        })
        .then(res => {
          setStatusMessage(res.data);
          setIsLoading(false)
          return res;
        })
        .catch((error) => {
          setStatusMessage(error.response.data);
          setIsLoading(false);
        });

      setIsLoading(false);
    }

    return (<Fragment>
      <DialogContent className={s.dialogContent}>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="normal"
            label="Login"
            type="email"
            fullWidth
            value={form.login}
            onChange={(e) => setForm({...form, login: e.target.value})}
            error={!form.login}
            helperText={!form.login && 'Введите login получателя'}
          />
          <TextField
            autoFocus
            margin="normal"
            id="amount"
            label="Сумма"
            type="number"
            fullWidth
            value={form.amount}
            onChange={(e) => setForm({...form, amount: Number(e.target.value)})}
            error={form.amount <= 0}
            helperText={form.amount <= 0 && 'Сумма должна быть больше 0'}
          />
        </FormControl>
        {!isLoading && statusMessage && <h3>{statusMessage}</h3>}
        {isLoading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal} color="primary">
          Cancel
        </Button>
        <Button disabled={isLoading || !isFormFilled} onClick={transferHandler} color="primary">
          Next
        </Button>
      </DialogActions>
    </Fragment>);
  }}
}
