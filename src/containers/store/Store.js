import React from "react";
import { Paper, Divider } from '@material-ui/core';

import s from './Store.Module.css'
import StoreCard from "./StoreCard";


export default function Store() {
  const storeCards = [
    {
      title: 'Start',
      price: 80,
      licenseTerm: 1,
      img: 'small',
      quantity: 1
    },
    {
      title: 'Standart',
      price: 300,
      licenseTerm: 12,
      img: 'medium',
      quantity: 1
    },
    {
      title: 'Business',
      price: 700,
      licenseTerm: 'infinity',
      img: 'medium',
      quantity: 1
    },
    {
      title: 'Investor',
      price: 1250,
      licenseTerm: 'infinity',
      img: 'big',
      quantity: 3
    },
  ]
  return <div className={s.root}>
    <Paper className={s.paper}>
      <h1>Primer Store</h1>
      <Divider />
      <div className={s.cardsHolder}>
        {storeCards && storeCards.map((card, index) => (
          <StoreCard
            key={index}
            cardTitle={card.title}
            cardPackPrice={`${card.price} y.e.`}
            licenseTerm={Number(card.licenseTerm) ? `${card.licenseTerm} месяцев` : 'Безлимит'}
            img={card.img}
            quantity={card.quantity}
          />
        ))}
        <div className={s.applyBtn}>Оформить</div>
      </div>
    </Paper>
  </div>;
}
