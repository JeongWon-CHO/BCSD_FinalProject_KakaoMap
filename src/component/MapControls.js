import React from 'react';
import { ZoomIn, ZoomOut } from '../utils/KakaoMapApi';
import styles from './MapControls.module.scss';


const MapControls = ({ level }) => {
  return (
    <div className={styles.container}>
      <button onClick={ZoomIn} className={styles.btn}>+</button>
      <button onClick={ZoomOut} className={styles.btn}>-</button>
      <span id='maplevel' className={styles.mapLevel}>Current Level : {level}</span>
    </div>
  );
}


export default MapControls;