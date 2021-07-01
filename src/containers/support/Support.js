import { Box, Container } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import s from "./Support.module.css";

export default function Support() {
  const user = useSelector((state) => state.user);
  const { email = "", info } = user;
  let name = "____";
  let lastname = "________";
  if (info !== null) {

  }
  console.log(email, info);
  return (
    <div className={s.root}>
      <Container>
        <Box my={4}>
          <h3>Служба поддержки</h3>
          <h1>«Premier Support»</h1>
          <p>
            Для составления обращения обязательно укажите в письме свои{" "}
            <span>ФИО</span> и <span>email</span>.
            <br />
            Рекомендуем детально описать задачу, в которой необходима помощь.
          </p>
          <p>
            Обратиться можно составив обращение на почту:{" "}
            <a
              href={`mailto:premier.club.team@gmail.com?subject=Нужна помощь c _____&body=Добрый день. %0D%0A Я ${lastname} ${name}. %0D%0A Моя почта ${email} %0D%0A Мне нужна помощь с _________.%0D%0A`}
              target="_blank"
              rel="noopener noreferrer"
              className={s.button}
            >
              premier.club.team@gmail.com
            </a>
            <br />
            или обратиться к нам в телеграм:{" "}
            <a
              href={"https://t.me/PremierSupportBot"}
              target="_blank"
              rel="noopener noreferrer"
              className={s.button}
            >
              @PremierSupportBot
            </a>
          </p>
          <p>Рабочее время в будние дни: 09.00-17.00 (Московское время)</p>
        </Box>
      </Container>
    </div>
  );
}
