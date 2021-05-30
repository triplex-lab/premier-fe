import React from "react";
import { Box } from "@material-ui/core";
import s from "./FirstInst.module.css";

export default function FirstInst() {
  return (
    <div className={s.root}>
      <Box my={4}>
        <h2>
          План регистрации для подключения
          <br />
          торгового робота «Premier»
        </h2>
        <ul className={s.firstInst}>
          <li className={s.firstInst_item}>
            <h3 className={s.title}>Открытие счёта на сайте брокера</h3>
            <p className={s.desc}>
              Все сделки на мировом валютном рынке совершаются через брокера. Мы
              выбрали одного из самых надёжных брокеров - Roboforex, который
              отлично работает уже более 10 лет и оказывает профессиональный
              сервис. Ниже будет инструкция для регистрации.
            </p>
            <div className={s.line}></div>
            <div className={s.circle}></div>
          </li>
          <li className={s.firstInst_item}>
            <h3 className={s.title}>Регистрация удалённого рабочего стола</h3>
            <p className={s.desc}>
              Серия торговых роботов Premier работает круглосуточно. Для работы
              робота мы устанавливаем торговый терминал на удаленный рабочий
              стол, всего за 3$ в месяц. Это "компьютер в аренду" для
              беспрерывной и качественной работы.
            </p>
            <div className={s.line}></div>
            <div className={s.circle}></div>
          </li>
          <li className={s.firstInst_item}>
            <h3 className={s.title}>Регистрация аккаунта мониторинга</h3>
            <p className={s.desc}>
              После того, как вам будет установлен робот и он приступит к
              торговле, вам будет подключен мониторинг статистики, что бы вы
              могли отслеживать текущую прибыль с любого устройства. Для этого
              введите ниже ключ, который придет вам после регистрации на сайте
              мониторинга.
            </p>
            <div className={s.line}></div>
            <div className={s.circle}></div>
          </li>
          <li className={s.firstInst_item}>
            <h3 className={s.title}>Отправление данных для подключения</h3>
            <p className={s.desc}>
              После открытия счёта и получения удалённого рабочего стола
              необходимо заполнить форму в конце данной инструкции, для того
              чтобы специалисты из отдела «Premier Support» подключили робота к
              вашему торговому счёту.
            </p>
            <div className={s.line}></div>
            <div className={s.circle}></div>
          </li>
        </ul>
      </Box>
    </div>
  );
}
