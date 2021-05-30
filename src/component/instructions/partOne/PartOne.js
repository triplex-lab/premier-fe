import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import s from "./PartOne.module.css";
import InfoIcon from "@material-ui/icons/Info";
import img1 from "../../../images/inst-part-one1.png";
import img2 from "../../../images/inst-part-one2.png";

export default function PartOne() {
  const [visible, setvisible] = useState(false);
  return (
    <Box my={4} className={s.root}>
      <h3>1. Открытие счета на сайте брокера</h3>
      <p>Регистрация автоматически произойдет по реферальной ссылке спонсора</p>

      <Button color="primary" variant="contained">
        Открыть счет
      </Button>
      <div className={s.desc}>
        <p className={s.text}>
          <InfoIcon className={s.icon} color="secondary" />
          Открытие счёта происходит исключительно по реферальной ссылке
          вышестоящего спонсора.
        </p>
        <p className={s.text}>
          Если вдруг у вас ранее был аккаунт на данном брокере - свяжитесь с
          вашим спонсором для решения данного вопроса.
        </p>
      </div>
      <Button
        // color="primary"
        style={{ color: "green", border: `2px solid green` }}
        variant="outlined"
        onClick={() => setvisible((pre) => !pre)}
      >
        Показать инструкцию
      </Button>
      {visible && (
        <div>
          <ul className={s.list}>
            <li className={s.item}>
              <div className={s.wrap}>
                <img className={s.img} src={img1} alt={"скрин 1"} />
              </div>
            </li>
            <li className={s.item}>
              1. Нажимаем "Опробуйте бесплатный Demo-счёт", либо "Открыть
              торговый счёт".
            </li>
            <li className={s.item}>2. Заполняем личные данные.</li>
            <li className={s.item}>
              3. Выставляем значения, как на скриншоте:
            </li>
            <li className={s.item}>
              <div className={s.wrap}>
                <img className={s.img} src={img2} alt={"скрин 2"} />
              </div>
            </li>
            <li className={s.item}>
              4. После регистрации проходим верификацию. Для этого требуется
              загрузить лицевое фото паспорта и прописку.
            </li>
            <li className={s.item}>
              5. После регистрации откройте второй счёт (по итогу у вас должно
              быть открыто 2 счёта: реальный и демо-счет). Сделайте это сразу,
              что бы больше не возвращаться к вопросу открытия счетов.
            </li>
          </ul>
        </div>
      )}
    </Box>
  );
}
