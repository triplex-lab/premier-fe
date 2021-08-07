import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextareaAutosize } from '@material-ui/core';
import { useSelector } from 'react-redux';

import s from './GroupModal.Module.css'

export default ({isOpen, setIsOpen}) => {

  const user = useSelector(({user}) => user);
  console.log(user)

  const [copySuccess, setCopySuccess] = useState('Копировать');
  const textAreaRef = useRef(null);

  function copyToClipboard() {
    textAreaRef.current.select();
    document.execCommand('copy');
    setCopySuccess('Скопировано');
  };

  const onClose = () => {
    setIsOpen(false);
    setCopySuccess('Скопировать');
  }

  return <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Реферальная ссылка</DialogTitle>
    <DialogContent>
      <DialogContentText className={s.dialogContent} id="alert-dialog-description">
        <TextareaAutosize
          className={s.textArea}
          ref={textAreaRef}
          readOnly
          variant='outlined'
          color='inherit'
          value={user.refCode}
          onClick={copyToClipboard}
        />
        <Button
          onClick={copyToClipboard}
          variant='outlined'
          color='inherit'
        >
          {copySuccess}
        </Button>
      </DialogContentText>
    </DialogContent>
    <DialogActions className={s.dialogActions}>
      <Button onClick={onClose} color="inherit">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
}
