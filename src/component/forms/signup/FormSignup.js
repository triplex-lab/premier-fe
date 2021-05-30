import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import s from "./FormSignup.module.css";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { signUp } from "../../../redux/auth/authOperations";
import Notification from "../../notification/Notification";

const validationSchema = yup.object({
  ref: yup.string("Find your ref"),
  // .email("Enter a valid email")
  // .required("Email is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
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

export default function FormSignup() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(signUp(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  let { referral } = useParams();
  const ref = referral === "ref" ? "" : referral;

  const formik = useFormik({
    initialValues: {
      ref,
      email: "",
      password: "",
      confirmPassword: "",
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
        id="ref"
        name="ref"
        label="спонсор"
        value={formik.values.ref}
        onChange={formik.handleChange}
        error={formik.touched.ref && Boolean(formik.errors.ref)}
        helperText="Впишите логин вашего спонсора или попросите у него ссылку на регистрацию"
        // helperText={formik.touched.ref && formik.errors.ref}
      />
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
      {status !== 201 ? (
        <Button color="primary" variant="contained" fullWidth type="submit">
          Регистрация
        </Button>
      ) : (
        <Button variant="outlined" fullWidth type="submit">
          успешная регистрация проверьте почту
        </Button>
      )}
    </form>
  );
}
