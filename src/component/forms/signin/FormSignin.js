import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import s from "./FormSignin.module.css";
import { signIn } from "../../../redux/auth/authOperations";
import Notification from "../../notification/Notification";
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  pwd: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function FormSignin() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(signIn(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      pwd: "",
    },
    validationSchema: validationSchema,
    onSubmit: funSub,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.root}>
      <Notification message={msg} cleanMsg={() => setMsg("")} />
      <TextField
        fullWidth
        variant="outlined"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        variant="outlined"
        id="pwd"
        name="pwd"
        label="Password"
        type="password"
        value={formik.values.pwd}
        onChange={formik.handleChange}
        error={formik.touched.pwd && Boolean(formik.errors.pwd)}
        helperText={formik.touched.pwd && formik.errors.pwd}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Войти
      </Button>
    </form>
  );
}
