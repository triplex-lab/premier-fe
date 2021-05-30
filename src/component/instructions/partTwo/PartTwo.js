import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import s from "./PartTwo.module.css";
import img1 from "../../../images/inst-part-two1.png";
import img2 from "../../../images/inst-part-two2.png";
import img3 from "../../../images/inst-part-two3.png";
import img4 from "../../../images/inst-part-two4.png";
import img5 from "../../../images/inst-part-two5.png";

export default function PartTwo() {
  const [visible, setvisible] = useState(false);
  return (
    <Box my={4} className={s.root}>
      <h3>2. Регистрация удалённого рабочего стола</h3>
      <a
        href="https://my.forex-box.com/aff.php?aff=8532"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button color="primary" variant="contained">
          Перейти на сайт
        </Button>
      </a>

      <p>
        Стоимость удаленного рабочего стола 3$ в месяц, ﻿оплачивается очень
        легко, с карты или ApplePay.
      </p>
      <Button
        // color="primary"
        style={{ color: "green", border: `2px solid green` }}
        variant="outlined"
        onClick={() => setvisible((pre) => !pre)}
      >
        Показать инструкцию
      </Button>
      {visible && (
        <ul>
          <li className={s.item}>
            <div className={s.poit}>1</div>
            <div className={s.line}></div>
            <div className={s.wrap}>
              <img className={s.img} src={img1} alt={"скрин 1"} />
            </div>
          </li>
          <li className={s.item}>
            <div className={s.poit}>2</div>
            <div className={s.line}></div>
            <div className={s.wrap}>
              <img className={s.img} src={img2} alt={"скрин 2"} />
            </div>
          </li>
          <li className={s.item}>
            <div className={s.poit}>3</div>
            <div className={s.line}></div>
            <p className={s.text}>
              Введите промокод: A8532LZE - он даст скидку 5% на первую оплату
            </p>
            <div className={s.wrap}>
              <img className={s.img} src={img3} alt={"скрин 3"} />
            </div>
          </li>
          <li className={s.item}>
            <div className={s.poit}>4</div>
            <div className={s.line}></div>
            <div className={s.wrap}>
              <img className={s.img} src={img4} alt={"скрин 4"} />
            </div>
          </li>
          <li className={s.item}>
            <div className={s.poit}>5</div>
            <div className={s.line}></div>
            <div className={s.wrap}>
              <img className={s.img} src={img5} alt={"скрин 5"} />
            </div>
          </li>
        </ul>
      )}
    </Box>
  );
}
