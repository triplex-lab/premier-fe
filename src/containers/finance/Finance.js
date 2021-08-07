import React, { useState } from "react";
import { Button } from "@material-ui/core";

import HistoryTransaction from "../../component/historyTransaction/HistoryTransaction";
import s from "./Finance.module.css";
import FormModal from '../../component/FormModal';
import FormModalContent from '../../containers/finance/FormModalContent';
import Alert from '../../icons/Alert';

export default function Finance() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('');
  const [form, setForm] = useState({});

  const dialogFormTitle = () => {
    switch(formMode) {
      case 'purchase':
      return 'Пополнение баланса';

      case 'output':
      return 'Вывод средств';

      case 'transfer':
      return 'Перевод';
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setForm({});
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h2>Finance</h2>
        <div className={s.payCards}>
          <div className={s.payCard}>
            <div className={s.cardInfo}>
              <Alert/>
              <span className={s.cardInfoText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, eaque.
              </span>
            </div>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              className={s.cardButton}
              onClick={() => {
                setIsModalOpen(true)
                setFormMode('purchase')
              }}
            >
              Пополнение баланса
            </Button>
          </div>
          <div className={s.payCard}>
            <div className={s.cardInfo}>
              <Alert/>
              <span className={s.cardInfoText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, eaque.
              </span>
            </div>
            <div className={s.payeerImg}></div>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              className={s.cardButton}
              onClick={() => {
                setIsModalOpen(true)
                setFormMode('output')
              }}
            >
              Вывод средств
            </Button>
          </div>
          <div className={s.payCard}>
            <div className={s.cardInfo}>
              <Alert/>
              <span className={s.cardInfoText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, eaque.
              </span>
            </div>
            <Button
              color="primary"
              variant="outlined"
              fullWidth
              className={s.cardButton}
              onClick={() => {
                setIsModalOpen(true)
                setFormMode('transfer')
              }}
            >
              Перевод
            </Button>
          </div>
        </div>
        <HistoryTransaction />
        <FormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          dialogTitle={dialogFormTitle()}
          onClose={onClose}
        >
          <FormModalContent
            formMode={formMode}
            form={form}
            setForm={setForm}
            onClose={onClose}
          />
        </FormModal>
      </div>
    </div>
  );
}
