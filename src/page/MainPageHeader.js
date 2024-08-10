import React from 'react';
import styles from './MainPageHeader.module.scss';

function MainPageHeader() {
    return (
        <div>
            <header className={styles.headerBlock}>
                <span className={styles.logoLeft}>kakao</span>
                <nav className={styles.navTag}>
                <ul className={styles.ulNav}>
                    <li><a href="#">소개</a></li>
                    <li><a href="#">이야기</a></li>
                    <li><a href="#">지도</a></li>
                    <li><a href="#">마이페이지</a></li>
                </ul>
                </nav>
            </header>
        </div>
    );
}

export default MainPageHeader;