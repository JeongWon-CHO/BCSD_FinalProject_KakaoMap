import React from 'react';
import styles from './MainPageBody2.module.scss';

function MainPageBody2() {
    return (
        <div>
            

            <div className={styles.blankSpace}></div>
            
            <div className={styles.title_container}>
                <p className={styles.title}>나만의 새로운 지도를 만들어 보세요</p>
            </div>

            <div className={styles.divCenter}>
                <span className={styles.boxBackground}></span>
                <span className={styles.boxBackground}></span>
                <span className={styles.boxBackground}></span>
            </div>

        </div>
    );
}

export default MainPageBody2;