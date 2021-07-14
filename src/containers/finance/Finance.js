import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Button } from "@material-ui/core";

import HistoryTransaction from "../../component/historyTransaction/HistoryTransaction";
import s from "./Finance.module.css";
import FormModal from '../../component/FormModal';
import FormModalContent from '../../containers/finance/FormModalContent';

export default function Finance() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('');
  const [form, setForm] = useState({});

  const currUser = useSelector(({ user }) => user);

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
          <Button
            color="primary"
            variant="outlined"
            className={s.payCard}
            onClick={() => {
              setIsModalOpen(true)
              setFormMode('purchase')
            }}
          >Пополнение баланса</Button>
          <Button
            color="primary"
            variant="outlined"
            className={s.payCard}
            onClick={() => {
              setIsModalOpen(true)
              setFormMode('output')
            }}
          >Вывод средств</Button>
          <Button
            color="primary"
            variant="outlined"
            className={s.payCard}
            onClick={() => {
              setIsModalOpen(true)
              setFormMode('transfer')
            }}
          >Перевод</Button>
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
            user={currUser}
          />
        </FormModal>
      </div>
    </div>
  );
}
