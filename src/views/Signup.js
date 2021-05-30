import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Page from "../component/UIcomponents/Page/Page";
import MainLogo from "../component/logo/MainLogo";
import FormSignup from "../component/forms/signup/FormSignup";
import s from "./Views.module.css";

export default function Signup() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Box my={4}>
          <MainLogo />
          <h2>Регистрация</h2>

          <FormSignup />

          <p className={s.desc}>
            Уже есть аккаунт? Тогда переходи на страницу входа. Жми кнопку
            Войти.
          </p>
          <Link to={`/signin`}>
            <Button fullWidth variant="outlined" color="primary">
              Войти
            </Button>
          </Link>
        </Box>
      </Container>
    </Page>
  );
}
