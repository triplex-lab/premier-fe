import React, { useState, useEffect } from "react";
import { 
  Paper,
  Divider,
  Button,
  Select,
  MenuItem,
  InputLabel,
  DialogContent,
  FormControl,
  DialogActions,
  CircularProgress
} from '@material-ui/core';
import axios from "axios";
import { useSelector } from 'react-redux';


import s from './Store.Module.css'
import FormModal from '../../component/FormModal';
import StoreCardsControl from "./StoreCardsControl";


export default function Store() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currPackage, setCurrPackage] = useState('');
  const [packages, setPackages] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(({user}) => user);

  const getPackages = async () => {
    if (!user.id) {
      return;
    }
    await axios.get(`http://localhost:5000/api/user/${user.id}/upgrades`)
      .then(response => {
        setPackages(response.data)
      })
      .catch(error => console.log(error))
  }

  const postPackages = async () => {
    if (!currPackage || isLoading) {
      return;
    }
    setIsLoading(true);
    await axios.post(`http://localhost:5000/api/user/${user.id}/upgrades`, {
      packetName: currPackage,
    })
      .then(response => {
        if (!!response.data) {
          getPackages();
          setIsModalOpen(false);
          setIsLoading(false)
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getPackages()
  }, [user.id]);

  return <div className={s.root}>
    <Paper className={s.paper}>
      <h1>Primer Store</h1>
      <Divider />
      <div className={s.cardsHolder}>

        <StoreCardsControl
          packages={packages}
          setCurrPackage={setCurrPackage}
          setIsModalOpen={setIsModalOpen}
        />

        {packages && <Button
          onClick={() => setIsModalOpen(true)}
          variant={'outlined'}
          color={'inherit'}
          className={s.applyBtn}
        >
          Оформить
        </Button>}

      </div>

      <FormModal
        isModalOpen={isModalOpen}
        dialogTitle={'Оформить пакет'}
        onClose={() => setIsModalOpen(false)}
      >

        <DialogContent className={s.styledDialogContent}>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Название пакета
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              margin="dense"
              label="Название пакета"
              type="text"
              fullWidth
              value={currPackage}
              onChange={(e) => setCurrPackage(e.target.value)}
            >
              {!!packages && Object.keys(packages).map((pack, index) => {
                return <MenuItem key={index} value={pack}>{pack}</MenuItem>
              })}
            </Select>
          </FormControl>

          {isLoading && <CircularProgress />}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button disabled={isLoading || !currPackage} onClick={postPackages} color="primary">
            Next
          </Button>
        </DialogActions>
      </FormModal>

    </Paper>
  </div>;
}
