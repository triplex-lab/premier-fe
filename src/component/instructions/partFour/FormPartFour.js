import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import Notification from "../../notification/Notification";
import s from "./FormPartFour.module.css";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("name is required"),
  demoAccountNumber: yup.string("Enter your demoAccountNumber"),
  demoAccountPass: yup.string("Enter your demoAccountPass"),
  accountNumber: yup
    .string("Enter your accountNumber")
    .required("accountNumber is required"),
  accountPass: yup
    .string("Enter your accountPass")
    .required("accountPass is required"),
  type: yup.string("Enter your type").required("type is required"),
  ip: yup.string("Enter your ip").required("ip is required"),
  PCname: yup.string("Enter your PCname").required("PCname is required"),
  PCpass: yup.string("Enter your PCpass").required("PCpass is required"),
  FXkey: yup.string("Enter your FXkey").required("FXkey is required"),
});

export default function FormPartFour() {
  const [msg, setMsg] = useState("");
  const [status, setstatus] = useState("");

  const funSub = async (data) => {
    console.log(data);

    // const statusCode = await dispatch(sendMail(data));
    // setMsg(statusCode.message);
    // setstatus(statusCode.status);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      demoAccountNumber: "",
      demoAccountPass: "",
      accountNumber: "",
      accountPass: "",
      type: "",
      ip: "",
      PCname: "",
      PCpass: "",
      FXkey: "",
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
        id="name"
        name="name"
        label="Имя и Фамилия"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        variant="outlined"
        id="demoAccountNumber"
        name="demoAccountNumber"
        label="Номер ДЕМО счёта"
        value={formik.values.demoAccountNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.demoAccountNumber &&
          Boolean(formik.errors.demoAccountNumber)
        }
        helperText="Оставьте поле пустым, если открыли только реальный счет"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="demoAccountPass"
        name="demoAccountPass"
        label="Пароль от ДЕМО счёта"
        value={formik.values.demoAccountPass}
        onChange={formik.handleChange}
        error={
          formik.touched.demoAccountPass &&
          Boolean(formik.errors.demoAccountPass)
        }
        helperText="Оставьте поле пустым, если открыли только реальный счет"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="accountNumber"
        name="accountNumber"
        label="Номер РЕАЛЬНОГО счёта"
        value={formik.values.accountNumber}
        onChange={formik.handleChange}
        error={
          formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
        }
        helperText="8 цифр"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="accountPass"
        name="accountPass"
        label="Пароль от РЕАЛЬНОГО счёта"
        value={formik.values.accountPass}
        onChange={formik.handleChange}
        error={formik.touched.accountPass && Boolean(formik.errors.accountPass)}
        helperText="Он пришёл вам на ip"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="type"
        name="type"
        label="Тип счёта"
        value={formik.values.type}
        onChange={formik.handleChange}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText="Из того же письма на почте RoboForex-ProCent-9"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="ip"
        name="ip"
        label="Данные удаленного рабочего стола"
        value={formik.values.ip}
        onChange={formik.handleChange}
        error={formik.touched.ip && Boolean(formik.errors.ip)}
        helperText="IP Адрес u0000.f000.forex-box.com:0000"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="PCname"
        name="PCname"
        label="Имя компьютера"
        value={formik.values.PCname}
        onChange={formik.handleChange}
        error={formik.touched.PCname && Boolean(formik.errors.PCname)}
        helperText="U00000"
      />
      <TextField
        fullWidth
        variant="outlined"
        id="PCpass"
        name="PCpass"
        label="Пароль компьютера"
        value={formik.values.PCpass}
        onChange={formik.handleChange}
        error={formik.touched.PCpass && Boolean(formik.errors.PCpass)}
      />
      <TextField
        fullWidth
        variant="outlined"
        id="FXkey"
        name="FXkey"
        label="Ключ от FXmonitor"
        value={formik.values.FXkey}
        onChange={formik.handleChange}
        error={formik.touched.FXkey && Boolean(formik.errors.FXkey)}
        helperText="CHLzrM5E57xbOXqq - подобного содержания"
      />

      <Button color="primary" variant="contained" fullWidth type="submit">
        Отправить
      </Button>
    </form>
  );
}
