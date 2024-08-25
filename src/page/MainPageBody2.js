import React from 'react';
import styles from './MainPageBody2.module.scss';
import icon_kakako from '../img/MainPage/icon_kakaomap.png';

function MainPageBody2() {
    return (
        <div>

            <div className={styles.blankSpace}></div>
            
            <div className={styles.title_container}>
                <p className={styles.title}>나만의 새로운 지도를 만들어 보세요</p>
            </div>

            <div className={styles.divCenter}>
                <img src={icon_kakako} className={styles.icon_img}></img>
                <p className={styles.paragraph}>대한민국에서 가장 빠른 길을 안내하는<br />카카오맵!</p>
            </div>

        </div>
    );
}

export default MainPageBody2;