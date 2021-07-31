import React from 'react';

import StoreCard from "./StoreCard";
import staticData from './staticData';


export default ({packages, setCurrPackage, setIsModalOpen}) => {

  const packagesCount = Object.keys(packages).length;

  const setPackage = (packageTitle) => {
    setIsModalOpen(true);
    setCurrPackage(packageTitle.toLowerCase());
  }

  if (packages && staticData) {
    const cardTitles = Object.keys(packages);

    return cardTitles.map((title, index) => {
      let [pack] = staticData.filter(card => card.title.toLocaleLowerCase() === title);

      return <StoreCard
        upgrade={packagesCount !== 4}
        onSetPack={() => setPackage(pack.title)}
        key={index}
        cardTitle={pack.title}
        cardPackPrice={`${packages[title]} y.e.`}
        licenseTerm={Number(pack.licenseTerm) ? `${pack.licenseTerm} месяцев` : 'Безлимит'}
        img={pack.img}
        quantity={pack.quantity}
      />
    });
  } else {
    return <h1>Нету доступных пакетов.</h1>
  }
}
