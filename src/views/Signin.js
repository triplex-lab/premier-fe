import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Page from "../component/UIcomponents/Page/Page";
import MainLogo from "../component/logo/MainLogo";
import FormSignin from "../component/forms/signin/FormSignin";
import s from "./Views.module.css";

export default function Signin() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Box my={4}>
          <MainLogo />
          <h2>Вход</h2>
          <FormSignin />

          <p className={s.desc}>
            Еще нет аккаунта? Тогда переходи на страницу регистрации. Жми кнопку
            Зарегистрироваться.
          </p>
          <div className={s.wrap}>
            <Link to={`/signup/ref`}>
              <Button fullWidth variant="outlined" color="primary">
                Зарегистрироваться
              </Button>
            </Link>
            <Link to={`/recovery-password`}>
              <Button fullWidth variant="outlined" color="primary">
                Востановить пароль
              </Button>
            </Link>
          </div>
        </Box>
      </Container>
    </Page>
  );
}
