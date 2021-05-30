import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Notification from "../notification/Notification";
import s from "./PaySettings.module.css";
import { Container } from "@material-ui/core";

const validationSchema = yup.object({
  payeer: yup.string("Enter your payeer").required("payeer is required"),
  password: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const setPaySettings = (data) => {
  console.log(data);
};

export default function PaySettings() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(setPaySettings(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      payeer: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: funSub,
  });
  return (
    <Container maxWidth="sm">
      <h3>Платежные реквизиты</h3>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Notification message={msg} cleanMsg={() => setMsg("")} />
        <TextField
          fullWidth
          variant="outlined"
          id="payeer"
          name="payeer"
          label="Номер счёта Payeer"
          value={formik.values.payeer}
          onChange={formik.handleChange}
          error={formik.touched.payeer && Boolean(formik.errors.payeer)}
          helperText="Партнёрская ссылка payeer"
        />
        <TextField
          fullWidth
          variant="outlined"
          id="password"
          name="password"
          label="Пароль"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText="Партнёрская ссылка password"
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
