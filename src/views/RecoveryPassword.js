import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Page from "../component/UIcomponents/Page/Page";
import MainLogo from "../component/logo/MainLogo";
import FormRecoveryPassword from "../component/forms/recoveryPassword/FormRecoveryPassword";
import s from "./Views.module.css";

export default function RecoveryPassword() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Box my={4}>
          <MainLogo />
          <h2>Востановить пароль</h2>

          <FormRecoveryPassword />

          <div className={s.wrap}>
            <Link to={`/signin`}>
              <Button fullWidth variant="contained" color="primary">
                Войти
              </Button>
            </Link>

            <Link to={`/`}>
              <Button fullWidth variant="outlined" color="primary">
                На главную
              </Button>
            </Link>
          </div>
        </Box>
      </Container>
    </Page>
  );
}
