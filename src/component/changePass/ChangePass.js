import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import axios from 'axios';

import s from "./ChangePass.module.css";
import Notification from "../notification/Notification";


const validationSchema = yup.object({
  curPassword: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  newPassword: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
    newPassword2: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Password is required"),
});

export default function ChangePass() {

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async () => {
    await axios.post('/settings', {
      ...formik.values,
      tab: 'pwd'
    })
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
      curPassword: "",
      newPassword: "",
      newPassword2: "",
    },
    validationSchema: validationSchema,
    onSubmit: funSub,
  });
  return (
    <Container maxWidth="sm">
      <h3>Смена пароля</h3>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Notification message={msg} cleanMsg={() => setMsg("")} />
        <TextField
          fullWidth
          variant="outlined"
          id="curPassword"
          name="curPassword"
          label="Текущий пароль"
          value={formik.values.curPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.curPassword &&
            Boolean(formik.errors.curPassword)
          }
          helperText={
            formik.touched.curPassword && formik.errors.curPassword
          }
        />
        <TextField
          fullWidth
          variant="outlined"
          id="newPassword"
          name="newPassword"
          label="Пароль"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="newPassword2"
          name="newPassword2"
          label="Подтверждение пароля"
          type="password"
          value={formik.values.newPassword2}
          onChange={formik.handleChange}
          error={
            formik.touched.newPassword2 &&
            Boolean(formik.errors.newPassword2)
          }
          helperText={
            formik.touched.newPassword2 && formik.errors.newPassword2
          }
        />
        {status !== 201 ? (
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
