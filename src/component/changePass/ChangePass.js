import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Notification from "../notification/Notification";
import s from "./ChangePass.module.css";
import { Container } from "@material-ui/core";

const validationSchema = yup.object({
  currentPassword: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  password: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password is required"),
});

const setChangePass = (data) => {
  console.log(data);
};

export default function ChangePass() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(setChangePass(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
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
          id="currentPassword"
          name="currentPassword"
          label="Текущий пароль"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.currentPassword &&
            Boolean(formik.errors.currentPassword)
          }
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
        />
        <TextField
          fullWidth
          variant="outlined"
          id="password"
          name="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="confirmPassword"
          name="confirmPassword"
          label="Подтверждение пароля"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
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
