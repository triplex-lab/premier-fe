import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Notification from "../../component/notification/Notification";
import s from "./UserInfo.module.css";
import { Container } from "@material-ui/core";

const validationSchema = yup.object({
  tel: yup
    .string("Enter your tel")
    .min(3, "tel should be of minimum 3 characters length")
    .required("tel is required"),
  name: yup.string("Enter your name").required("name is required"),
  lastname: yup.string("Enter your lastname").required("lastname is required"),
  middlename: yup.string("Enter your middlename"),
  city: yup.string("Enter your city"),
});

const setUserInfo = (data) => {
  console.log(data);
};

export default function UserInfo() {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    const statusCode = await dispatch(setUserInfo(data));
    setMsg(statusCode.message);
    setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      tel: "",
      name: "",
      lastname: "",
      middlename: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: funSub,
  });
  return (
    <Container maxWidth="sm">
      <h3>Общая информация</h3>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Notification message={msg} cleanMsg={() => setMsg("")} />
        <TextField
          fullWidth
          variant="outlined"
          id="tel"
          name="tel"
          label="tel"
          value={formik.values.tel}
          onChange={formik.handleChange}
          error={formik.touched.tel && Boolean(formik.errors.tel)}
          helperText={formik.touched.tel && formik.errors.tel}
        />
        <TextField
          fullWidth
          variant="outlined"
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
