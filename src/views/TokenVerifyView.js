import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Page from "../component/UIcomponents/Page/Page";
import MainLogo from "../component/logo/MainLogo";
import s from "./Views.module.css";

const verification = async (verToken) => {
  return await axios
    .get(`/verify/${verToken}`)
    .then(({ status }) => ({ code: status }))
    .catch(({ response }) => ({
      code: response.status,
      message: response.data || "error",
    }));
};

export default function TokenVerifyView() {
  let { verificationToken } = useParams();
  const [status, setstatus] = useState("");
  const notification = async () => {
    const resStatus = await verification(verificationToken);
    if (resStatus.code === 200) {
      setstatus("Ваша почта успешно подтверджена");
    } else {
      setstatus(`code=${resStatus.code}, ${resStatus.message}`);
    }
  };

  useEffect(() => {
    notification();
  }, [verificationToken]);

  return (
    <Page>
      <Container maxWidth="sm">
        <Box my={4}>
          <MainLogo />
          {status !== "" && <p style={{ textAlign: "center" }}>{status}</p>}
          <div className={s.wrap}>
            <Link to={`/signin`}>
              <Button fullWidth variant="outlined" color="primary">
                Вход
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
