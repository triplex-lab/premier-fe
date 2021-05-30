import React from "react";
import HistoryTransaction from "../../component/historyTransaction/HistoryTransaction";
import s from "./Finance.module.css";

export default function Finance() {
  return (
    <div className={s.root}>
      <h2>Finance</h2>
      <div className={s.payCards}>
        <div>Пополнение баланса</div>
        <div>Вывод средств</div>
        <div>Перевод</div>
      </div>
      <HistoryTransaction />
    </div>
  );
}
