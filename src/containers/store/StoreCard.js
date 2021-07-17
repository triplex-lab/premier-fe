import React from 'react';

import s from './Store.Module.css'
import smallRocketImage from '../../images/rocketSmall.png';
import mediumRocketImage from '../../images/rocketSmall-Medium.png';
import bigRocketImage from '../../images/bigRocket.png';
//import chevronRight from '../../images/chevronRight.png';


export default ({
  cardTitle="Standart",
  cardPackPrice="300 y.e.",
  licenseTerm="1 год",
  img="small",
  quantity=1
}) => {

  let imgClass;
  let imgPicture

  const robotsQuantity = quantity > 1 ? `${quantity} РОБОТА` : `${quantity} РОБОТ`;

  (function() {
    if (img === 'small') {
      imgPicture = smallRocketImage;
      imgClass= s.smallRocketImage
      return;
    }
    if (img === 'medium') {
      imgPicture = mediumRocketImage;
      imgClass= s.mediumRocketImage
      return;
    }
    if (img === 'big') {
      imgPicture = bigRocketImage;
      imgClass= s.bigRocketImage
      return;
    }
  })()

  return <div className={s.card}>
    <h1 className={s.cardTitle}>
      {cardTitle}
      <span className={s.cardSubtitle}>Пакет</span>
    </h1>
    <div className={s.infoSection}>
      <span className={s.cardPrice}>{cardPackPrice}</span>
      <img className={imgClass} src={imgPicture} />
      <div className={s.infoContainer}>
        <span className={s.quantity}>{robotsQuantity}</span>
        <span className={s.license}>Срок лицензии:</span>
        <span className={s.license}>{licenseTerm}</span>
        </div>
    </div>
  </div>
}
