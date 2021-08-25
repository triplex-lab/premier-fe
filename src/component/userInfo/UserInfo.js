import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import axios from 'axios';

import Notification from "../../component/notification/Notification";
import s from "./UserInfo.module.css";


const validationSchema = yup.object({
  phone: yup
    .string("Enter your tel")
    .min(3, "tel should be of minimum 3 characters length")
    .required("tel is required"),
    firstname: yup.string("Enter your firstname").required("firstname is required"),
  lastname: yup.string("Enter your lastname").required("lastname is required"),
  middlename: yup.string("Enter your middlename"),
  city: yup.string("Enter your city"),
});

export default ({currUser}) => {
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  if (!currUser) {
    return null;
  }
  const funSub = async () => {
    await axios.post('/settings', {...formik.values, tab: 'general'})
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
      phone: currUser.phone,
      firstname: currUser.firstname,
      lastname: currUser.lastname,
      middlename: currUser.middlename,
      city: currUser.city,
    },
    validationSchema: validationSchema,
    onSubmit: funSub,
  });
  return (
    <Container maxWidth="sm">
      <h3>Общая информация</h3>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Notification message={msg} cleanMsg={() => {
            setMsg("");
            setstatus(null)
          }} />
        <TextField
          fullWidth
          variant="outlined"
          id="phone"
          name="phone"
          label="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="firstname"
          name="firstname"
          label="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="lastname"
          name="lastname"
          label="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="middlename"
          name="middlename"
          label="middlename"
          value={formik.values.middlename}
          onChange={formik.handleChange}
          error={formik.touched.middlename && Boolean(formik.errors.middlename)}
          helperText={formik.touched.middlename && formik.errors.middlename}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="city"
          name="city"
          label="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
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
