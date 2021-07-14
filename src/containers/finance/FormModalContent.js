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


export default ({formMode, setForm, form, onClose, user}) => {
  const [isLoading, setIsLoading] = useState(false);
  switch (formMode) {
    case 'purchase': {
    let isFormFilled = form.m_amount > 0 && form.m_curr ? true : false;

    const handleReplenishment = async () => {
      setIsLoading(true);
      if (!isFormFilled || isLoading) {
        return;
      }
      let res;
      await axios
        .post("/api/finance/generatePaymentPage", form)
        .then((response) => {
          res = response.data.url;
          window.open(res);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        });
      onClose();
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
            error={form.m_amount <= 0}
            value={form.m_amount}
            onChange={(e) => setForm({...form, m_amount: e.target.value})}
            helperText={form.m_amount <= 0 && 'Сумма должна быть больше 0'}
          />
          <FormControl className={s.styledFormControl}>
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
          </FormControl>
        </FormControl>
        {isLoading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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
    let isFormFilled = form.money > 0 && form.toUserId ? true : false;

    const transferHandler = async () => {
      setIsLoading(true);
      if (!isFormFilled || isLoading) {
        return;
      }
      await axios
        .post("/api/finance/transfer", {
          ...form,
          fromUserId: Number(user.id)
        })
        .catch((error) => {
          console.log(error)
        });

      setIsLoading(false);
      onClose();
    }

    return (<Fragment>
      <DialogContent className={s.dialogContent}>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="normal"
            label="ID получателя"
            type="text"
            fullWidth
            value={form.toUserId}
            onChange={(e) => setForm({...form, toUserId: Number(e.target.value)})}
            error={!!!form.toUserId}
            helperText={!!!form.toUserId && 'Введите ID получателя'}
          />
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Сумма"
            type="number"
            fullWidth
            value={form.money}
            onChange={(e) => setForm({...form, money: Number(e.target.value)})}
            error={form.money <= 0}
            helperText={form.money <= 0 && 'Сумма должна быть больше 0'}
          />
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Кометарий"
            type="text"
            fullWidth
            value={form.comment}
            onChange={(e) => setForm({...form, comment: e.target.value})}
          />
        </FormControl>
        {isLoading && <CircularProgress />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button disabled={isLoading || !isFormFilled} onClick={transferHandler} color="primary">
          Next
        </Button>
      </DialogActions>
    </Fragment>);
  }}
}
