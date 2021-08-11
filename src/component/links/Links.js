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
  const [links, setLinks] = useState(
    {
      forex4you: '',
      roboforex: '',
      forexbox: '',
      vk: '',
      facebook: '',
      instagram: '',
    }
  );

  const getLinks = async () => {
    await axios.get('/settings')
      .then(res => {
        if (res.data && res.data.settings) {
          setLinks(res.data.settings);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const funSub = async () => {
    await axios.post('/settings', {...formik.values, tab: 'links'})
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

  const formik = useFormik({
    initialValues: {
      forex4you: links.forex4you,
      roboforex: links.roboforex,
      forexbox: links.forexbox,
      vk: links.vk,
      facebook: links.facebook,
      instagram: links.instagram,
    },
    onSubmit: funSub,
  });

  useEffect(() => {
    getLinks();
  }, [false])

  if (!links) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <h3>Ссылки</h3>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Notification message={msg} cleanMsg={() => setMsg("")} />
        <TextField
          fullWidth
          variant="outlined"
          id="forex4you"
          name="forex4you"
          label="forex4you"
          value={formik.values.forex4you}
          onChange={formik.handleChange}
          error={formik.touched.forex4you && Boolean(formik.errors.forex4you)}
          helperText="Партнёрская ссылка Forex4You"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="roboforex"
          name="roboforex"
          label="roboforex"
          value={formik.values.roboforex}
          onChange={formik.handleChange}
          error={formik.touched.roboforex && Boolean(formik.errors.roboforex)}
          helperText="Партнёрская ссылка Roboforex"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="forexbox"
          name="forexbox"
          label="forexbox"
          value={formik.values.forexbox}
          onChange={formik.handleChange}
          error={formik.touched.forexbox && Boolean(formik.errors.forexbox)}
          helperText="Партнёрская ссылка Forex Box"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="vk"
          name="vk"
          label="vk"
          value={formik.values.vk}
          onChange={formik.handleChange}
          error={formik.touched.vk && Boolean(formik.errors.vk)}
          helperText={formik.touched.vk && formik.errors.vk}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="facebook"
          name="facebook"
          label="facebook"
          value={formik.values.facebook}
          onChange={formik.handleChange}
          error={formik.touched.facebook && Boolean(formik.errors.facebook)}
          helperText={formik.touched.facebook && formik.errors.facebook}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="instagram"
          name="instagram"
          label="instagram"
          value={formik.values.instagram}
          onChange={formik.handleChange}
          error={formik.touched.instagram && Boolean(formik.errors.instagram)}
          helperText={formik.touched.instagram && formik.errors.instagram}
        />
        {status !== 200 ? (
          <Button color="primary" variant="outlined" fullWidth type="submit">
            Сохранить
          </Button>
        ) : (
          <Button disabled variant="outlined" fullWidth type="submit">
            успешно
          </Button>
        )}
      </form>
    </Container>
  );
}
