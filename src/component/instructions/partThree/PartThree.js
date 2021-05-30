import { Box, Button } from "@material-ui/core";
import React from "react";
import s from "./PartThree.module.css";

export default function PartThree() {
  return (
    <Box my={4} className={s.root}>
      <h3>3. Регистрация аккаунта мониторинга</h3>

      <a
        href="https://fxmonitor.online/registration?invite=a9i3v"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button color="primary" variant="contained">
          Открыть сайт Fxmonitor
        </Button>
      </a>

      <p>
        После регистрации вам на почту придет <strong>ключ</strong>. Его так же
        нужно указать в заявке ниже.
      </p>
    </Box>
  );
}
