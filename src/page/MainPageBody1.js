import React from 'react';
import styles from './MainPageBody1.module.scss';
import img1 from '../img/MainPage/MainPage_001.jpg';
import img2 from '../img/MainPage/MainPage_002.jpg';
import img3 from '../img/MainPage/MainPage_003.jpg';


function MainPageBody1() {
    return (
        <div>
            <p className={styles.title}>기술과 사람으로 더 나은 세상을 만듭니다.</p>
            <div className={styles.divCenter}>
                <img src={img1} className={styles.boxBackground1}></img>
                <img src={img2} className={styles.boxBackground2}></img>
                <img src={img3} className={styles.boxBackground3}></img>
            </div>

        </div>
    );
}

export default MainPageBody1;