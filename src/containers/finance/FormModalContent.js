import React, { Fragment, useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  DialogActions,
  DialogContent,
  Button,
  InputLabel,
  FormHelperText,
  CircularProgress ,
} from '@material-ui/core';
import axios from 'axios';

import s from "./Finance.module.css";


export default ({formMode, setForm, form, onClose}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');


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
      let res;
      await axios
        .post("/finance/add", form)
        .then((response) => {
          console.log(response)
          //res = response.data.url;
          //window.open(res);
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
          {/*<FormControl className={s.styledFormControl}>
            <InputLabel error={!!!form.m_curr} id="demo-simple-select-label">
              Валюта
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              autoFocus
              margin="normal"
              label="Валюта"
              type="text"
              fullWidth
              value={form.m_curr}
              onChange={(e) => setForm({...form, m_curr: e.target.value})}
              error={!!!form.m_curr}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'UAH'}>UAH</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
            {!!!form.m_curr && <FormHelperText error={true}>Выберите валюту перевода</FormHelperText>}
          </FormControl>*/}
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

    case 'output':
    return <Fragment>
      output
    </Fragment>

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
