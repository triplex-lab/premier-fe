import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Page from "../component/UIcomponents/Page/Page";
import MainLogo from "../component/logo/MainLogo";
import s from "./Views.module.css";

export default function Home() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Box my={4}>
          <MainLogo />
          <h1>ТОРГОВЫЙ РОБОТ «PREMIER»</h1>
          <div className={s.wrap}>
            <Link to={`/signin`}>
              <Button fullWidth variant="contained" color="primary">
                Войти
              </Button>
            </Link>

            <Link to={`/signup/ref`}>
              <Button fullWidth variant="outlined">
                Зарегистрироваться
              </Button>
            </Link>
          </div>
        </Box>
      </Container>
    </Page>
  );
}
