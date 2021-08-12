import React, { useState, useEffect} from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import axios from 'axios';

import Notification from "../../component/notification/Notification";
import s from "./Links.module.css";


export default () => {

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");
  const [form, setForm] = useState({
    forex4you: '',
    roboforex: '',
    forexbox: '',
    vk: '',
    facebook: '',
    instagram: '',
  });

  const getLinks = async () => {
    await axios.get('/settings')
      .then(res => {
        if (res.data && res.data.settings) {
          setForm(res.data.settings);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const funSub = async () => {
    await axios.post('/settings', {...form, tab: 'links'})
      .then(res => {
        if (res.status === 201) {
          console.log(res)
          setMsg('Успешная операция');
          setstatus(res.status);
        }
      })
      .catch(() => {
        setMsg('Ошибка, попробуйте позже');
        setstatus(400);
      })
  };

  useEffect(() => {
    getLinks();
  }, [false])

  if (!form) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <h3>Ссылки</h3>
      <form className={s.form}>
        <Notification message={msg} cleanMsg={() => setMsg("")} />
        <TextField
          fullWidth
          variant="outlined"
          id="forex4you"
          name="forex4you"
          label="forex4you"
          value={form.forex4you}
          onChange={(e) => setForm({...form, forex4you: e.target.value})}
          helperText="Партнёрская ссылка Forex4You"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="roboforex"
          name="roboforex"
          label="roboforex"
          value={form.roboforex}
          onChange={(e) => setForm({...form, roboforex: e.target.value})}
          helperText="Партнёрская ссылка Roboforex"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="forexbox"
          name="forexbox"
          label="forexbox"
          value={form.forexbox}
          onChange={(e) => setForm({...form, forexbox: e.target.value})}
          helperText="Партнёрская ссылка Forex Box"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="vk"
          name="vk"
          label="vk"
          value={form.vk}
          onChange={(e) => setForm({...form, vk: e.target.value})}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="facebook"
          name="facebook"
          label="facebook"
          value={form.facebook}
          onChange={(e) => setForm({...form, facebook: e.target.value})}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="instagram"
          name="instagram"
          label="instagram"
          value={form.instagram}
          onChange={(e) => setForm({...form, instagram: e.target.value})}
        />
        {status !== 200 ? (
          <Button color="primary" variant="outlined" fullWidth onClick={funSub}>
            Сохранить
          </Button>
        ) : (
          <Button disabled variant="outlined" fullWidth>
            успешно
          </Button>
        )}
      </form>
    </Container>
  );
}
