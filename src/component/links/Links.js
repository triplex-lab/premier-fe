import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Notification from "../../component/notification/Notification";
import s from "./Links.module.css";
import { Container } from "@material-ui/core";

const setLinks = (data) => {
  console.log(data);
};

export default function Links() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(setLinks(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      Forex4You: "",
      Roboforex: "",
      ForexBox: "",
      VK: "",
      Facebook: "",
      Instagram: "",
    },
    onSubmit: funSub,
  });
  return (
    <Container maxWidth="sm">
      <h3>Ссылки</h3>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Notification message={msg} cleanMsg={() => setMsg("")} />
        <TextField
          fullWidth
          variant="outlined"
          id="Forex4You"
          name="Forex4You"
          label="Forex4You"
          value={formik.values.Forex4You}
          onChange={formik.handleChange}
          error={formik.touched.Forex4You && Boolean(formik.errors.Forex4You)}
          helperText="Партнёрская ссылка Forex4You"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="Roboforex"
          name="Roboforex"
          label="Roboforex"
          value={formik.values.Roboforex}
          onChange={formik.handleChange}
          error={formik.touched.Roboforex && Boolean(formik.errors.Roboforex)}
          helperText="Партнёрская ссылка Roboforex"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="ForexBox"
          name="ForexBox"
          label="ForexBox"
          value={formik.values.ForexBox}
          onChange={formik.handleChange}
          error={formik.touched.ForexBox && Boolean(formik.errors.ForexBox)}
          helperText="Партнёрская ссылка Forex Box"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="VK"
          name="VK"
          label="VK"
          value={formik.values.VK}
          onChange={formik.handleChange}
          error={formik.touched.VK && Boolean(formik.errors.VK)}
          helperText={formik.touched.VK && formik.errors.VK}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="Facebook"
          name="Facebook"
          label="Facebook"
          value={formik.values.Facebook}
          onChange={formik.handleChange}
          error={formik.touched.Facebook && Boolean(formik.errors.Facebook)}
          helperText={formik.touched.Facebook && formik.errors.Facebook}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="Instagram"
          name="Instagram"
          label="Instagram"
          value={formik.values.Instagram}
          onChange={formik.handleChange}
          error={formik.touched.Instagram && Boolean(formik.errors.Instagram)}
          helperText={formik.touched.Instagram && formik.errors.Instagram}
        />
        {status !== 200 ? (
          <Button color="primary" variant="contained" fullWidth type="submit">
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
