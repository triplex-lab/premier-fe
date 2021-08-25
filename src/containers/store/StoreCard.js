import React from 'react';

import s from './Store.Module.css'
import smallRocketImage from '../../images/rocketSmall.png';
import mediumRocketImage from '../../images/rocketSmall-Medium.png';
import bigRocketImage from '../../images/bigRocket.png';
import chevronRight from '../../images/chevronRight.png';


export default ({
  cardTitle="Standart",
  cardPackPrice="300 y.e.",
  licenseTerm="1 год",
  img="small",
  quantity=1,
  onSetPack,
  upgrade,
}) => {

  let cardClass;
  let cardPicture;

  const robotsQuantity = quantity > 1 ? `${quantity} РОБОТА` : `${quantity} РОБОТ`;

  (function() {
    if (img === 'small') {
      cardPicture = smallRocketImage;
      cardClass= s.smallRocketImage
      return;
    }
    if (img === 'medium') {
      cardPicture = mediumRocketImage;
      cardClass= s.mediumRocketImage
      return;
    }
    if (img === 'big') {
      cardPicture = bigRocketImage;
      cardClass= s.bigRocketImage
      return;
    }
  })()

  return <div onClick={onSetPack} className={s.card}>
      <div className={s.cardTitle}>
        <span className={s.cardTitleHolder}>{cardTitle}</span>
        {!upgrade && <span className={s.cardSubtitle}>пакет</span>}
      </div>

    <div className={s.infoSection}>
      <span className={s.cardPrice}>{cardPackPrice}</span>
      <img className={cardClass} src={cardPicture} />
      <div className={s.infoContainer}>
        <span className={s.quantity}>{robotsQuantity}</span>
        <span className={s.license}>Срок лицензии:</span>
        <span className={s.license}>{licenseTerm}</span>
        </div>
    </div>
  </div>
}
