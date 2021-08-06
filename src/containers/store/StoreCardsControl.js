import React from 'react';

import StoreCard from "./StoreCard";
import staticData from './staticData';


export default ({packages, setCurrPackage, setIsModalOpen}) => {

  const packagesCount = Object.keys(packages).length;

  const setPackage = (packageTitle) => {
    setIsModalOpen(true);
    setCurrPackage(packageTitle.toLowerCase());
  }

  if (packages) {
    return packages.map((pack, index) => {
      return <StoreCard
        upgrade={packagesCount !== 4}
        onSetPack={() => setPackage(pack.name)}
        key={index}
        cardTitle={pack.name}
        cardPackPrice={`${pack.price} y.e.`}
        licenseTerm={pack.expireTime > 0 ? `${Math.floor(pack.expireTime / (60 * 60 * 24 * 30 * 1000))} месяцев` : 'Безлимит'}
        img={staticData[index].img}
        quantity={pack.quantity}
      />
    });
  } else {
    return <h1>Нету доступных пакетов.</h1>
  }
}
