import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import s from "./FormRecoveryPassword.module.css";
import { useDispatch } from "react-redux";
import { recoveryPassword } from "../../../redux/auth/authOperations";
import Notification from "../../notification/Notification";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function FormRecoveryPassword() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(recoveryPassword(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
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
      {/* <Button color="primary" variant="contained" fullWidth type="submit">
        Востановить пароль
      </Button> */}
      {status !== 200 ? (
        <Button color="primary" variant="contained" fullWidth type="submit">
          Востановить пароль
        </Button>
      ) : (
        <Button disabled variant="outlined" fullWidth type="submit">
          востановления пароля успешно проверьте почту
        </Button>
      )}
    </form>
  );
}
