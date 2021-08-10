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
  const [currPackageName, setCurrPackageName] = useState('');
  const [packages, setPackages] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(({user}) => user);

  const getPackages = async () => {
    if (!user.id) {
      return;
    }
    await axios.get(`/order`)
      .then(response => {
        if (response.data && response.data.packs) {
          setPackages(response.data.packs)
        }
      })
      .catch(error => console.log(error))
  }

  const postPackages = async () => {
    if (!currPackageName || isLoading) {
      return;
    }
    setIsLoading(true);
    const [currPack] = packages.filter((pack, index) => pack.name === currPackageName);
    console.log(currPack)
    if (!currPack) {
      return;
    }
    await axios.post(`http://localhost:5000/order/buy`, {
      pack: currPack.id,
    })
      .then(response => {
        if (response.data) {
          getPackages();
          setIsModalOpen(false);
          setIsLoading(false)
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
      <h1 style={{color: "#ec860d"}}>Primer Store</h1>
      <Divider />
      <div className={s.cardsHolder}>

        <StoreCardsControl
          packages={packages}
          setCurrPackage={setCurrPackageName}
          setIsModalOpen={setIsModalOpen}
        />

        {packages.length > 0 && <Button
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
              value={currPackageName}
              onChange={(e) => setCurrPackageName(e.target.value)}
            >
              {packages && packages.map((pack, index) => {
                return <MenuItem key={index} value={pack.name}>{pack.name}</MenuItem>
              })}
            </Select>
          </FormControl>

          {isLoading && <CircularProgress />}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button disabled={isLoading || !currPackageName} onClick={postPackages} color="primary">
            Next
          </Button>
        </DialogActions>
      </FormModal>

    </Paper>
  </div>;
}
