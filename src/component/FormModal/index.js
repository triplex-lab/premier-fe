import React from 'react';
import {
  Dialog,
  DialogTitle,
} from '@material-ui/core';


export default ({isModalOpen, setIsModalOpen, dialogTitle, onClose, children}) => {

  return (
    <div>
      <Dialog open={isModalOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {dialogTitle}
        </DialogTitle>
        {children}
      </Dialog>
    </div>
  );
}
