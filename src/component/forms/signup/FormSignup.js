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
  //ref: yup.string("Find your ref"),
  // .email("Enter a valid email")
  // .required("Email is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  pwd1: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  pwd2: yup
    .string("Enter your password")
    .min(1, "Password should be of minimum 8 characters length")
    .oneOf([yup.ref("pwd1"), null], "Passwords must match")
    .required("Password is required"),
  firstname: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastname: yup
    .string("Enter your last name")
    .required("Last name is required"),
  middlename: yup
    .string("Enter your middle name")
    .required("Middle name is required"),
  city: yup
    .string("Enter your city")
    .required("City is required"),
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

  //let { referral } = useParams();
  //const ref = referral === "ref" ? "" : referral;

  const formik = useFormik({
    initialValues: {
      pwd1: "",
      pwd2: "",
      email: "",
      phone: "",
      firstname: "",
      lastname: "",
      middlename: "",
      city: "",
      refCode: 'iPrRRGLzNeMCMtfgYzBmAz'
    },
    validationSchema: validationSchema,
    onSubmit: funSub,
  });
  return (
    <form onSubmit={formik.handleSubmit} className={s.root}>
      <Notification message={msg} cleanMsg={() => setMsg("")} />
      {/*<TextField
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
      />*/}
      <TextField
        fullWidth
        variant="outlined"
        id="lastname"
        name="lastname"
        label="Фамилия"
        type="text"
        value={formik.values.lastname}
        onChange={formik.handleChange}
        error={
          formik.touched.lastname &&
          Boolean(formik.errors.lastname)
        }
        helperText={
          formik.touched.lastname && formik.errors.lastname
        }
      />
      <TextField
        fullWidth
        variant="outlined"
        id="firstname"
        name="firstname"
        label="Имя"
        type="text"
        value={formik.values.firstname}
        onChange={formik.handleChange}
        error={
          formik.touched.firstname &&
          Boolean(formik.errors.firstname)
        }
        helperText={
          formik.touched.firstname && formik.errors.firstname
        }
      />
      <TextField
        fullWidth
        variant="outlined"
        id="middlename"
        name="middlename"
        label="Отчество"
        type="text"
        value={formik.values.middlename}
        onChange={formik.handleChange}
        error={
          formik.touched.middlename &&
          Boolean(formik.errors.middlename)
        }
        helperText={
          formik.touched.middlename && formik.errors.middlename
        }
      />
      <TextField
        fullWidth
        variant="outlined"
        id="city"
        name="city"
        label="Город"
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
      />
      <TextField
        fullWidth
        variant="outlined"
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        variant="outlined"
        id="phone"
        name="phone"
        label="Телефон"
        type="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={
          formik.touched.phone &&
          Boolean(formik.errors.phone)
        }
        helperText={
          formik.touched.phone && formik.errors.phone
        }
      />
      {/*<TextField
        fullWidth
        variant="outlined"
        id="password"
        name="password"
        label="Пароль"
        type="password"
        value={formik.values.pwd1}
        onChange={formik.handleChange}
        error={
          formik.touched.pwd1 &&
          Boolean(formik.errors.pwd1)
        }
        helperText={
          formik.touched.pwd1 && formik.errors.pwd1
        }
      />*/}
      <TextField
        fullWidth
        variant="outlined"
        id="pwd1"
        name="pwd1"
        label="Подтверждение пароля"
        type="password"
        value={formik.values.pwd1}
        onChange={formik.handleChange}
        error={
          formik.touched.pwd1 &&
          Boolean(formik.errors.pwd1)
        }
        helperText={
          formik.touched.pwd1 && formik.errors.pwd1
        }
      />
      <TextField
        fullWidth
        variant="outlined"
        id="pwd2"
        name="pwd2"
        label="Подтверждение пароля"
        type="password"
        value={formik.values.pwd2}
        onChange={formik.handleChange}
        error={
          formik.touched.pwd2 &&
          Boolean(formik.errors.pwd2)
        }
        helperText={
          formik.touched.pwd2 && formik.errors.pwd2
        }
      />
      {Number(status) && status !== 201 ? (
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
